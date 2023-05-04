import React from 'react';
import styled from 'styled-components';

const ContainerFooter = styled.footer`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primaryColor};
  width: var(--mainWidth);
  height: var(--FooterHeigth);
  z-index: 1;
  a {
    color: ${props => props.theme.colors.secondaryColor};
    text-shadow: 1px 1px 5px ${props => props.theme.colors.dark};
    font-size: 0.5rem;
  }  
`;

const Footer = () => {
  return (
    <ContainerFooter>
      <a href='https://github.com/PedroPaivaDev/la-petra' target="_blank">Desenvolvido por PedroPaivaDev</a>
    </ContainerFooter>
  )
}

export default Footer;