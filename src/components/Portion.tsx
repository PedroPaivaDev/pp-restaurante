import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const PortionDetail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: ${props => props.theme.colors.portionBg};
  background-position: center center;
  background-size: cover;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  box-shadow: 0px 7px 20px 0px ${props => props.theme.colors.dark};
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 10px;
  .portionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    h3 {
      color: ${props => props.theme.colors.primaryColor};
    }
  }
`;

const DivImage = styled.div<BgProps>`
  width: 100%;
  min-height: 200px;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  background: ${props => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
`;

interface PropsPortion {
  ingredient: Portion;
  marmita: {[key: string]: string[]};
  setMarmita: React.Dispatch<React.SetStateAction<{[key:string]: string[]}>>;
}
const Portion = ({ingredient, marmita, setMarmita}:PropsPortion) => {
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Adicionar',
    status: null,
    msg: null
  });

  React.useEffect(() => {
    if(marmita) {
      const verifyMarmita = Object.keys(marmita).includes(ingredient.type);      
      if(verifyMarmita) {
        const verifyPortion = marmita[ingredient.type].includes(ingredient.name);     
        verifyPortion && setStatusSubmit({
          ...statusSubmit,
          label: 'Remover'
        });
      }
    }
  },[marmita])

  function handleClick() {
    if(statusSubmit.label==='Adicionar') {
      if(marmita[ingredient.type]) {
        setMarmita({
          ...marmita,
          [ingredient.type]: [
            ...marmita[ingredient.type],
            ingredient.name
          ]
        });
        console.log('Adiciona item na chave', marmita)
      } else {
        setMarmita({
          ...marmita,
          [ingredient.type]: [ingredient.name]
        });
        console.log('Adiciona chave e item', marmita)
      }
      setStatusSubmit({
        label: 'Remover',
        status: 'sucess',
        msg: 'Adicionado com sucesso!'
      })
    } else if(statusSubmit.label==='Remover') {
      if(marmita[ingredient.type].length>1) {
        setMarmita({
          ...marmita,
          [ingredient.type]: marmita[ingredient.type].filter(name => name !== ingredient.name)
        });
        console.log('Remove item', marmita)
      } else {
        setMarmita({
          ...marmita,
          [ingredient.type]: []
        });
        console.log('Remove chave', marmita)
      }
      setStatusSubmit({
        label: 'Adicionar',
        status: 'sucess',
        msg: 'Removido da marmita'
      })
    }
  }

  return (
    <PortionDetail>
      <div className='portionHeader'>
        <h3>{ingredient.name}</h3>
        <Button label={statusSubmit.label} onClick={handleClick}
          statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
        />
      </div>
      <DivImage bgImage={ingredient.image[0]}/>
    </PortionDetail>
  )
}

export default Portion;