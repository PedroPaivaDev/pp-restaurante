import React from 'react';
import styled from 'styled-components';

interface BgProps {
  bgImage: string;
}

const PortionDetail = styled.div<BgProps>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  background: ${(props) => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
  border: 2px solid var(--primaryColor);
  box-shadow: black 0px 7px 20px 0px;
  width: 90%;
  max-width: 1000px;
  height: 90%;
  min-height: 300px;
  padding: 10px;
  gap: 5px;
  h3 {
    color: var(--primaryColor);
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
  border: 2px solid var(--primaryColor);
  background: ${(props) => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
`;

const Button = styled.button`
  background-color: var(--quaternaryColor);
  padding: 0px 10px;
  line-height: 26px;
  border: 1px solid var(--secondaryColor);
  border-radius: 10px;
  color: var(--primaryColor);
  box-shadow: 0px 1px 5px 0px black;
`

const Portion = ({ingredient}: {ingredient: string}) => {
  return (
    <PortionDetail bgImage='./papel.jpg'>
      <div className='portionHeader'>
        <h3>{ingredient}</h3>
        <Button>
          Adicionar
        </Button>
      </div>
      <DivImage bgImage='./arroz.jpg'/>
    </PortionDetail>
  )
}

export default Portion;