import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import arroz from '../assets/menu/arroz.jpg';

interface IProps {
  bgImage: string;
}

const PortionDetail = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  gap: 5px;
  margin: 20px;
  text-align: center;
  background: ${(props) => `url(${props.bgImage})`};
  box-shadow: black 0px 7px 20px 0px;
  background-position: center center;
  background-size: cover;
  color: var(--darkBrown);
  h2 {
    color: var(--darkBrown);
  }
`;

const Portion = ({ingredient}: {ingredient: string}) => {
  return (
    <PortionDetail bgImage='./papel.jpg'>
      <h2>{ingredient}</h2>
      <Image
        src={arroz}
        alt="Arroz"
      />
    </PortionDetail>
  )
}

export default Portion;