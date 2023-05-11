import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const DivLink = styled.div`
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
`;

const BgPaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.portionBg};
  background-position: center center;
  background-size: cover;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  box-shadow: 0px 7px 20px 0px ${props => props.theme.colors.dark};
  margin: 20px;
  padding: 10px;
  * {
    color: ${props => props.theme.colors.primaryColor};    
  }
`;

const Contact = () => {
  return (    
    <div className="container">
      <BgPaper>
        <div className="wrapper">
          <h2>Horários de Funcionamento</h2>
          <p><span>Almoço:</span> Terça a Domingo: 11:00h às 14:00h</p>
          <p><span>Noite:</span> Quinta a Sábado: 19:00h às 00:00h</p>
          <p style={{color: 'tomato'}}>Não abre na segunda-feira</p>
        </div>
        <div className="wrapper">
          <h2>Monte seu almoço</h2>
          <p>Faça seu pedido selecionando as porções e monte o sua marmita:</p>
          <DivLink>
            <Link href='/menu'>Pedir Marmitex</Link>
          </DivLink>
        </div>
        <div className="wrapper">
          <h2>Localização</h2>
          <p>Av. Doutor Roberto de Melo Queiroz</p>
          <p>Número 1790, Bairro Novo São José</p>
          <p>Bom Despacho / MG</p>
        </div>
      </BgPaper>
    </div>
  )
}

export default Contact;