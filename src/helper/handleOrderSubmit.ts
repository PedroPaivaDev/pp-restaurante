import { v4 as uuidv4 } from 'uuid';

import { registerOrder } from '@/services/firebase';
import tupleToObject from './tupleToObject';
import getMarmitaPrices from './getMarmitaPrices';

export default function handleOrderSubmit(
  bag:Bag, formDataEntries:FormDataEntries, totalPrice:number, userDB:UserDB, menu:Menu
) {
  const formData = tupleToObject(formDataEntries) as unknown as OrderChoices;

  const orderFormData: OrderFormData = {
    uid: userDB.uid,
    client: userDB.userData.displayName,
    contact: userDB.userData.phoneNumber as string,
    payment: formData.payment,
    installment: formData.installment ? formData.installment : null,
    delivery: formData.delivery ? formData.delivery : null,
    address: `${userDB.userData.street}, ${userDB.userData.streetNumber}, Bairro ${userDB.userData.neighborhood}. Referência: ${userDB.userData.reference}`
  }

  let orderBag:OrderBagDB = {};

  Object.keys(bag).forEach(marmitaId => {
    orderBag = {
      ...orderBag,
      marmitaId: {
        ...bag[marmitaId],
        price: getMarmitaPrices(bag[marmitaId].size, menu.prices)
      }
    }
  });

  const orderUuid = uuidv4();

  return registerOrder(orderUuid, userDB.uid, orderFormData, orderBag, totalPrice);
}