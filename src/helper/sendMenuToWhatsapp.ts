import { contactWhatsapp } from "@/components/Contact";

import getNameById from "./getNameById"
import timestampToShortDate from "./timestampToShortDate";

export default function sendMenuToWhatsapp(
  msg:ObjectKeyString, portions:string[], menuProducts:MenuProducts
) {

  function mapPortions() {

    let arroz = '';
    let feijao = '';
    let macarrao = '';
    let cozidos = '';
    let salada = '';
    let preparos = '';
    let carnes = '';


    portions.forEach(portionId => {
      if(portionId.includes('arroz')) {
        arroz += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('feijao')) {
        feijao += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('macarrao')) {
        macarrao += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('legumes') || portionId.includes('tuberculos')) {
        cozidos += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('frutas') || portionId.includes('verduras')) {
        salada += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('preparos')) {
        preparos += `- ${getNameById(portionId, menuProducts)}%0a`;
      } else if(portionId.includes('carnes')) {
        carnes += `${getNameById(portionId, menuProducts)} / `;
      }
    })
    return (
      `- ${arroz}%0a` +
      `- ${feijao}%0a` +
      `- ${macarrao}%0a` +
      `${preparos}%0a` +
      `- Cozidos: ${cozidos}%0a%0a` +
      `- Salada: ${salada}%0a%0a` +
      `- Carnes: ${carnes}%0a`
    );
  }

  function formatPhoneNumber(phoneNumber: number): string {
    const phoneNumberString = phoneNumber.toString();

    const ddd = phoneNumberString.slice(2, 4);
    const prefix = phoneNumberString.slice(4, 8);
    const suffix = phoneNumberString.slice(8);

    return `(${ddd}) ${prefix}-${suffix}`;
  }

  const urlApi = 'http://api.whatsapp.com/send';
  
  const header = `_Churrascaria do PP - ${timestampToShortDate(Date.now())}_%0a`;
  const dayMsg = `${msg['day-msg'] ? `${msg['day-msg']}%0a` : ''}`;
  const contact = `${formatPhoneNumber(contactWhatsapp)} Zap%0a`
  
  const mappedPortions = mapPortions();
  
  window.open(`${urlApi}?phone=${contactWhatsapp}&text=${header}${contact}${dayMsg}%0a*Cardápio do Dia*%0a%0a${mappedPortions}`, "_blank");
}