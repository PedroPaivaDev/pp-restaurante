import getNameById from './getNameById';

export default function handleOrderSubmit(
  bag:Bag, formDataEntries:FormDataEntries, totalPrice:number, menu:MenuProducts, userDB:UserDB, screenWidth:number
) {

  function arrayToObj(formDataEntries:FormDataEntries) {
    return formDataEntries.reduce((obj:ObjectKeyString, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  }  
  const formData = arrayToObj(formDataEntries) as unknown as OrderFormData;

  function mapPortions(portions:MarmitaPortions) {
    let ingredients = "";
    Object.keys(portions).forEach(category =>
      ingredients += `${category}: ${getNameById(portions,menu)[category]}%0a`.replace(/,/g, ', ')
    );
    return ingredients;
  }
  
  function mapMarmitas() {
    let products = "";
    Object.keys(bag).forEach(product => {
      const id = (`${bag[product].id}`).substring(4);
      const size = `*${bag[product].size}*: ${id} - R$${bag[product].price.toFixed(2)}%0a`;
      const portions = `${mapPortions(bag[product].portions)}%0a-----%0a`;
      products += size + portions
    })
    return products;
  }

  const storeNumber = 5537999237253;
  let urlApi = 'http://web.whatsapp.com/send';
  if(screenWidth < 914){
    urlApi = "https://api.whatsapp.com/send";
  }

  const header = `_Código do Pedido: ${Date.now()}_%0a_Cliente: ${userDB.userData.displayName}_%0a_Contato: ${userDB.userData.phoneNumber}_%0a`;
  const pay = `_Forma de Pagamento: ${formData.payment}${formData.installment ? ` ${formData.installment}` : ''}_%0a`;
  const deliveryAddress = formData.delivery ? `_*Entregar no endereço*: Rua ${userDB.userData.street}, ${userDB.userData.streetNumber}, Bairro ${userDB.userData.neighborhood}. Ponto de referência: ${userDB.userData.reference}._%0a` : '_*Retirada no Restaurante*_%0a';

  const mappedProducts = mapMarmitas();
  
  window.open(`${urlApi}?phone=${storeNumber}&text=${header}%0a${mappedProducts}%0a${pay}${deliveryAddress}_Preço Total: *R$${totalPrice.toFixed(2)}*_`, "_blank");
}