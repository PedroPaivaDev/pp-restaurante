import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Button from './Forms/Button';

const DivContact = styled.div`
  width: auto;
  margin-top: 10px;
  .divLink {
    margin-top: 10px;
    border-radius: 20px;
    transition: 0.3s;
    a {
      color: ${props => props.theme.colors.tertiaryColor};
      line-height: 26px;
      text-align: center;
      vertical-align: middle;
      transition: 0.3s;
      &:hover {
        color: ${props => props.theme.colors.primaryColor};
        text-shadow: none;
      }
    }
    animation: pulse 2s infinite;
    @keyframes pulse {
      0% {
        width: 160px;
        background: ${props => props.theme.colors.secondaryColor};
        box-shadow: 0 0 10px 10px ${props => props.theme.colors.secondaryColor};
      }
      50% {
        width: 130px;
        background: ${props => props.theme.colors.secondaryColor};
        box-shadow: 0 0 10px 10px ${props => props.theme.colors.secondaryColor};
      }
      100% {
        width: 160px;
        background: ${props => props.theme.colors.secondaryColor};
        box-shadow: 0 0 10px 10px ${props => props.theme.colors.secondaryColor};
      }
    }
  }
  .whatsapp {
    button {
      background-color: ${props => props.theme.colors.sucess};
    }
  }
`;

export const contactWhatsapp = 5537999237253;

const Contact = () => {

  function redirectToWhatsapp() {
    const urlApi = 'http://web.whatsapp.com/send';
    
    window.open(`${urlApi}?phone=${contactWhatsapp}&text=Olá! Gostaria de fazer um pedido.`, "_blank");
  }

  return (
    <DivContact className='bgPaper'>
      <div className="wrapper">
        <h2>Horários de Funcionamento</h2>
        <p><span>Almoço:</span> Terça a Domingo: 11:00h às 14:00h</p>
        <p><span>Noite:</span> Quinta a Sábado: 19:00h às 00:00h</p>
        <p style={{color: 'tomato'}}>Não abre na segunda-feira</p>
      </div>
      <div className="wrapper">
        <h2>Monte seu almoço</h2>
        <p>Faça seu pedido selecionando as porções e monte a sua marmita:</p>
        <div className='divLink'>
          <Link href='/menu'>Pedir Marmita</Link>
        </div>
      </div>
      <div className="wrapper">
        <h2>Localização</h2>
        <p>Av. Doutor Roberto de Melo Queiroz</p>
        <p>Número 1790, Bairro Novo São José</p>
        <p>Bom Despacho / MG</p>
      </div>
      <Button label='WhatsApp' onClick={redirectToWhatsapp} className='whatsapp'/>
    </DivContact>
  )
}

export default Contact;