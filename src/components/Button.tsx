import React from 'react';
import styled from 'styled-components';

const ContainerButton = styled.button`
  background-color: ${props => props.theme.colors.quaternaryColor};
  padding: 0px 10px;
  line-height: 26px;
  border: 1px solid ${props => props.theme.colors.quaternaryColor};
  border-radius: 10px;
  color: ${props => props.theme.colors.primaryColor};
  box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
  transition: 0.3s;
  &:hover {
    background-color: ${props => props.theme.colors.quintenaryColor};
  }
`;

const Button = ({label}:{label:string}) => {
  return (
    <ContainerButton>
      {label}
    </ContainerButton>
  )
}

export default Button;