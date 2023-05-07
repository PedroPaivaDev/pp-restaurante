import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const DivLink = styled.div`
  margin-top: 20px;
  border-radius: 20px;
  transition: 0.3s;
  a {
    color: ${props => props.theme.colors.primaryColor};
    line-height: 26px;
    text-align: center;
    vertical-align: middle;
    transition: 0.3s;
    &:hover {
      color: ${props => props.theme.colors.tertiaryColor};
      text-shadow: none;
    }
  }
  animation: pulse 2s infinite;

  @keyframes pulse {
  0% {
    width: 130px;
    background: rgba(252,223,106,0.7);
    box-shadow: 0 0 10px 10px rgba(252,223,106,0.7);
  }
  50% {
    width: 100px;
    background: rgba(252,223,106,0.6);
    box-shadow: 0 0 10px 10px rgba(252,223,106,0.6);
  }
  100% {
    width: 130px;
    background: rgba(252,223,106,0.7);
    box-shadow: 0 0 10px 10px rgba(252,223,106,0.7);
  }
  }
`;

const Contact = () => {
  return (    
    <div className="container">
      <div className="envelope">
        <div className="wrapper">
          <h2>Horários de Funcionamento</h2>
          <p><span>Almoço:</span> Terça a Domingo: 11:00h às 14:00h</p>
          <p><span>Noite:</span> Quinta a Sábado: 19:00h às 00:00h</p>
          <p style={{color: 'tomato'}}>Não abre na segunda-feira</p>
        </div>
        <div className="wrapper">
          <h2>Monte seu almoço</h2>
          <p>Faça seu pedido selecionando as porções e monte o seu almoço:</p>
          <DivLink>
            <Link href='/menu'>Marmitex</Link>
          </DivLink>
        </div>
        <div className="wrapper">
          <h2>Localização</h2>
          <p>Av. Doutor Roberto de Melo Queiroz</p>
          <p>Número 1790, Bairro Novo São José</p>
          <p>Bom Despacho / MG</p>
        </div>
      </div>
    </div>
  )
}

export default Contact;