import React from "react";
import { initializeApp } from "firebase/app";
import { User, getAuth } from "firebase/auth";
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { getDatabase, ref, onValue, set, child, update, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl3WwSjfa6vrQOQHUS7jjdmnK_XgbGZ0I",
  authDomain: "pp-restaurante.firebaseapp.com",
  databaseURL: "https://pp-restaurante-default-rtdb.firebaseio.com",
  projectId: "pp-restaurante",
  storageBucket: "pp-restaurante.appspot.com",
  messagingSenderId: "582849706653",
  appId: "1:582849706653:web:3742326a4b9eba6c237274"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
export const auth = getAuth(app)
const storage = getStorage(app);

//----------------------------------------

//MÉTODOS DO STORAGE

export async function uploadPhotoAndGetUrl(
  category: string,
  photoName: string,
  photoFile: File
) {
  const photosRef = storageRef(storage, `portions/${category}/${photoName}`);
  return uploadBytes(photosRef, photoFile).then(async (snapshot) => {
    const url = await getDownloadURL(storageRef(storage, snapshot.metadata.fullPath));
    return url;
  });
}

export function removePhotoFromDB(category: string, fileName: string) {
  const photoRef = storageRef(storage, `portions/${category}/${fileName}`);
  deleteObject(photoRef).then(() => {
    console.log("Imagem removida do Banco de Dados");
  }).catch(err => {
    console.log("Não foi possível remover a imagem no Banco de Dados", err)
  })
}

//MÉTODOS DO REALTIME DATABASE:

export function getData<Type>(path:string, setState:React.Dispatch<React.SetStateAction<Type>>) {
  const getRef = ref(db, path);
  onValue(
    getRef,
    (snapshot) => setState(snapshot.val()),
    {onlyOnce: true}
  )
}

export function setNewUser(userAuth:User) {
  const usersRef = ref(db, 'usuarios');
  const newUser = {
    uid: userAuth.uid,
    userData: {
      displayName: userAuth.displayName,
      email: userAuth.email,
      photoURL: userAuth.photoURL,
      createdAt: new Date(userAuth.metadata.creationTime as string).getTime(),
      lastLoginAt: new Date(userAuth.metadata.lastSignInTime as string).getTime(),
      phoneNumber: userAuth.phoneNumber,
      street: null,
      streetNumber: null,
      neighborhood: null,
      reference: null
    },
    userOrders: {}
  };
  set(child(usersRef,`${userAuth.uid}`), newUser)
}

export function changeUserData(uid:string, newData:ObjectKeyString) {
  const usersRef = ref(db, `usuarios/${uid}/userData`);
  update(usersRef, newData).then(() => {
    console.log(`UserDB updated`)
  }).catch(err => console.log(err));
}

export function changeProductAvailability(category:string, type:string, id:string, availability:boolean) {
  const productRef = ref(db, `cardapio/products/${category}/products/${type}/products/${id}`);
  update(productRef, {available: availability}).then(() => {
    console.log(`a disponibilidade do produto de id: ${id}, foi alterado para ${availability}`)
  });
}

export function setNewProduct(category:string, type:string, id:string, name:string, description:string, photoUrl:string) {
  const productsRef = ref(db, `cardapio/products/${category}/products/${type}/products`);
  const newProduct = {
    available: true,
    category: category,
    description: description,
    id: id,
    image: photoUrl,
    name: name,
    type: type
  };
  set(child(productsRef,`${id}`), newProduct);
}

export function removeProduct(category:string, type:string, id:string) {
  const productRef = ref(db, `cardapio/products/${category}/products/${type}/products/${id}`);
  remove(productRef).then(() => {
    console.log(`excluído o item ${id}`)
  }).catch((error) => { // não está funcionando o catch
    alert(`Não foi encontrado o item${id} para ser excluído.`);
    console.log(error);
  });
}

export function registerOrder(
  uuid:string, uid:string, orderFormData:OrderFormData, bag:Bag, totalPrice:number
) {
  const userOrdersRef = ref(db, `usuarios/${uid}/userOrders`);
  const userOrder:UserOrder = {
    orderFormData: orderFormData,
    orderMarmitas: bag,
    orderTime: Date.now(),
    totalPrice: totalPrice,
    uuid: uuid,
    status: "pendente",
  };
  return set(child(userOrdersRef,`${uuid}`), userOrder);
}

export function changeOrderStatus(userId:string, orderUuid:string, status:string) {
  const orderRef = ref(db, `usuarios/${userId}/userOrders/${orderUuid}`);
  update(orderRef, {status: status}).then(() => {
    console.log(`o status do pedido: ${orderUuid}, foi alterado para ${status}`)
  });
}