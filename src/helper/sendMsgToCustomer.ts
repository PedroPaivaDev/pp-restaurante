export default function sendMsgToCustomer(order:UserOrder) {
  const urlApi = 'https://api.whatsapp.com/send';
  const contactNumber = order.orderFormData.contact.replace(/\D/g, '');

  const msg = `Olá, ${order.orderFormData.client}. Meu nome é Marisa, falo do Restaurante do PP.%0aSeu pedido é o ${order.uuid}.`;

  window.open(`${urlApi}?phone=${contactNumber}&text=${msg}`, "_blank");
}