import { contactWhatsapp } from "@/components/Contact";

import getNameById from "./getNameById";
import getOptionValue from "./getOptionValue";
import timestampToShortDate from "./timestampToShortDate";

export default function sendMenuToWhatsapp(
  msg:ObjectKeyString, portions:string[], menuProducts:MenuProducts, weather:OptionsObject|null, phoneNumbers:ObjectKeyString
) {

  function mapPortions() {

    let arroz = '';
    let feijao = '';
    let macarrao = '';
    let cozidos = '';
    let salada = '';
    let preparos = '';

    let boi = '';
    let frango = '';
    let porco = '';
    let peixe = '';


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
        preparos += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('boi')) {
        boi += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('frango')) {
        frango += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('porco')) {
        porco += `${getNameById(portionId, menuProducts)} / `;
      } else if(portionId.includes('peixe')) {
        peixe += `${getNameById(portionId, menuProducts)} / `;
      }
    })
    return (
      `- ${arroz} %F0%9F%8D%9A %0a` +
      `- ${feijao} %F0%9F%A5%A3 %0a` +
      `- ${macarrao} %F0%9F%8D%9D %0a%0a` +
      `*Preparos*: %F0%9F%8D%9F %F0%9F%8D%B3 %F0%9F%A5%93 %0a${preparos}%0a%0a` +
      `*Cozidos*: %F0%9F%A5%95 %F0%9F%A5%94 %F0%9F%8D%A0 %0a${cozidos}%0a%0a` +
      `*Salada*: %F0%9F%A5%97 %F0%9F%8D%85 %F0%9F%A5%AC %0a${salada}%0a%0a` +
      `*Carnes*:%0a` +
      `- %F0%9F%90%AE: ${boi}%0a` +
      `- %F0%9F%90%94: ${frango}%0a` +
      `- %F0%9F%90%B7: ${porco}%0a` +
      `- %F0%9F%90%9F: ${peixe}%0a`
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
  
  const weatherEmoction = `${weather ? `${getOptionValue(weather)}` : ''}`
  const header = `_Churrascaria do PP ${weatherEmoction} - ${timestampToShortDate(Date.now())}%0a`;
  const dayMsg = `${msg['day-msg'] ? `${msg['day-msg']}%0a` : ''}`;
  const contact = `${formatPhoneNumber(contactWhatsapp)} - Zap%0a`;
  const phone1 = `${phoneNumbers.Marisa} - Marisa%0a`;
  const phone2 = `${phoneNumbers.Pedro} - Pedro%0a`;
  const service = `*Self-Service e Entrega de Marmita*%0a`;
  
  const mappedPortions = mapPortions();
  
  window.open(`${urlApi}?phone=${contactWhatsapp}&text=${header}${contact}${phone1}${phone2}${dayMsg}%0a${service}%0a${mappedPortions}`, "_blank");
}