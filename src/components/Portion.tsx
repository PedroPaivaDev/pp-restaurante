import React from 'react';
import styled from 'styled-components';

import Button from './Button';

interface BgProps {
  bgImage: string;
}

const PortionDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  background: ${props => props.theme.colors.portionBg};
  background-position: center center;
  background-size: cover;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  box-shadow: 0px 7px 20px 0px ${props => props.theme.colors.dark};
  width: 90%;
  max-width: 1000px;
  height: 90%;
  min-height: 300px;
  padding: 10px;
  gap: 5px;
  h3 {
    color: ${props => props.theme.colors.primaryColor};
  }
  .portionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const DivImage = styled.div<BgProps>`
  width: 100%;
  height: 100%;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  background: ${props => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
`;

const Portion = ({ingredient}: {ingredient: string}) => {
  return (
    <PortionDetail>
      <div className='portionHeader'>
        <h3>{ingredient}</h3>
        <Button label='Adicionar'/>
      </div>
      <DivImage bgImage='./arroz.jpg'/>
    </PortionDetail>
  )
}

export default Portion;