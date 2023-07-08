import getPortionsNames from "./getPortionsNames";

export default function sendOrderByWhatsapp(order:UserOrder, menu:MenuProducts, screenWidth:number, contactNumber:number
) {
  
  function mapPortions(portions:MarmitaPortions) {
    let ingredients = "";
    Object.keys(portions).forEach(category =>
      ingredients += `${category}: ${getPortionsNames(portions,menu)[category]}%0a`.replace(/,/g, ', ')
    );
    return ingredients;
  }
  
  function mapMarmitas() {
    let products = "";
    Object.keys(order.orderMarmitas).forEach(marmita => {
      const id = (`${order.orderMarmitas[marmita].id}`).substring(4);
      const size = `*${order.orderMarmitas[marmita].size}*: ${id} - R$${order.orderMarmitas[marmita].price.toFixed(2)}%0a`;
      const portions = `${mapPortions(order.orderMarmitas[marmita].portions)}%0a-----%0a`;
      products += size + portions
    })
    return products;
  }

  let urlApi = 'http://web.whatsapp.com/send';
  if(screenWidth < 914){
    urlApi = "https://api.whatsapp.com/send";
  }
  
  const header = `_Código do Pedido: ${order.uuid}_%0a_Cliente: ${order.orderFormData.client}_%0a_Contato: ${order.orderFormData.contact}_%0a`;
  const pay = `_Forma de Pagamento: ${order.orderFormData.payment}${order.orderFormData.installment ? ` ${order.orderFormData.installment}` : ''}_%0a`;
  const deliveryAddress = order.orderFormData.delivery ? `_*Entregar no endereço*: Rua ${order.orderFormData.address}._%0a` : '_*Retirada no Restaurante*_%0a';
  
  const mappedProducts = mapMarmitas();
  
  window.open(`${urlApi}?phone=${contactNumber}&text=${header}%0a${mappedProducts}%0a${pay}${deliveryAddress}_Preço Total: *R$${order.totalPrice.toFixed(2)}*_`, "_blank");
}