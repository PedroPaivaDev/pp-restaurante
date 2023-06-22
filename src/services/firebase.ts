import { initializeApp } from "firebase/app";
import { User, getAuth } from "firebase/auth"
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";

// Import Admin SDK
import { getDatabase, ref, onValue, set, child, update } from "firebase/database";
import React from "react";

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

//MÉTODOS DO REALTIME DATABASE:

//Para buscar os produtos no DB
export function getProducts(path:string, setState:React.Dispatch<React.SetStateAction<Menu>>) {
  const productsRef = ref(db, path);
  onValue(
    productsRef,
    (snapshot) => setState(snapshot.val()),
    {onlyOnce: true}
  )
}

export function getUsers(setState:React.Dispatch<React.SetStateAction<UsersDB>>) {
  const getRef = ref(db, 'usuarios');
  onValue(
    getRef,
    (snapshot) => setState(snapshot.val()),
    {onlyOnce: true}
  )
}

export function getUserDB(uid:string, setState:React.Dispatch<React.SetStateAction<UserDB|null>>) {
  const getRef = ref(db, `usuarios/${uid}`);
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

// Para atualizar produtos
export function changeProductAvailability(id:string, availability:boolean) {
  const category = id.split('_')[0];
  const type = id.split('_')[1].split('-')[0];
  const productRef = ref(db, `cardapio/products/${category}/products/${type}/products/${id.split('_')[1]}`);
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
    image: [photoUrl],
    name: name,
    type: type
  };
  set(child(productsRef,`${id}`), newProduct);
}

//Para registrar pedidos de clientes
// export function registerProductsOrder(name, description, price, image) {
//   const ordersRef = ref(db, 'productsOrders');
//   const product = {
//     name: name,
//     description: description,
//     price: price,
//     image: image
//   };
//   push(ordersRef, product)
// }

//Para remover produtos
// export function removeProduct(id) {
//   const productRef = ref(db, 'products/' + id);
//   remove(productRef).then(() => {
//     console.log(`excluído o item ${id}`)
//   }).catch((error) => { // não está funcionando o catch
//     alert(`Não foi encontrado o item${id} para ser excluído.`);
//     console.log(error);
//   });
//   // set(productsRef, null).then(() => {
//   //   console.log(`excluído o item ${id}`)
//   // });
// }

//Para ordenar produtos pelo nome (ainda não funciona)
// export function ordainByName() {
//   const eggsRef = ref(db, 'eggs');
//   const orderlyName = query(eggsRef, orderByChild('name'));
//   onChildAdded(orderlyName, (snapshot) => {
//     console.log(snapshot.val())
//   })
// }