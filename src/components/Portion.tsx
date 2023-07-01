import React from 'react';
import styled from 'styled-components';

import Button from './Forms/Button';

const PortionDetail = styled.div`
  position: relative;
  .portionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    h3 {
      color: ${props => props.theme.colors.primaryColor};
    }
    .buttonAddRemove {
      justify-content: flex-end;
      h6 {
        text-align: right;
        top: -30px;
      }
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
  marmita: Marmita;
  setMarmita: React.Dispatch<React.SetStateAction<Marmita>>;
}
const Portion = ({ingredient, marmita, setMarmita}:PropsPortion) => {
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Adicionar',
    status: null,
    msg: null
  });

  React.useEffect(() => {
    if(marmita.portions) {
      const verifyMarmita = Object.keys(marmita.portions).includes(ingredient.category);
      if(verifyMarmita) {
        const verifyPortion = marmita.portions[ingredient.category].includes(ingredient.id);     
        verifyPortion && setStatusSubmit({
          ...statusSubmit,
          label: 'Remover'
        });
      }
    }
    // eslint-disable-next-line
  },[marmita]);

  function verifyTwoMeats() {
    if(ingredient.category==='carnes') {
      if(marmita.portions?.carnes) {
        if(marmita.portions.carnes.length<2) {
          return true
        } else {
          setStatusSubmit({
            label: 'Adicionar',
            status: 'error',
            msg: 'Você já escolheu duas carnes'
          })
          return;
        }
      } else return true;
    } else return true;
  }

  function handleClick() {
    if(statusSubmit.label==='Adicionar' && verifyTwoMeats()) {
      if(marmita.portions && marmita.portions[ingredient.category]) {
        setMarmita({
          ...marmita,
          portions: {
            ...marmita.portions,
            [ingredient.category]: [
              ...marmita.portions[ingredient.category],
              ingredient.id
            ]
          }
        });
      } else {
        setMarmita({
          ...marmita,
          portions: {
            ...marmita.portions,
            [ingredient.category]: [ingredient.id]
          }
        });
      }
      setStatusSubmit({
        label: 'Remover',
        status: 'sucess',
        msg: 'Adicionado com sucesso!'
      })
    } else if(statusSubmit.label==='Remover') {
      if(marmita.portions && marmita.portions[ingredient.category].length>1) {
        setMarmita({
          ...marmita,
          portions: {
            ...marmita.portions,
            [ingredient.category]: marmita.portions[ingredient.category].filter(id => id !== ingredient.id)
          }
        });
      } else {
        const newMarmita:Marmita = JSON.parse(JSON.stringify(marmita));
        newMarmita.portions && delete newMarmita.portions[ingredient.category];
        setMarmita(newMarmita);
      }
      setStatusSubmit({
        label: 'Adicionar',
        status: 'sucess',
        msg: 'Removido da marmita'
      })
    }
  }

  return (
    <PortionDetail className='bgPaper'>
      <div className='portionHeader'>
        <h3>{ingredient.name}</h3>
        <Button label={statusSubmit.label} onClick={handleClick}
          statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
          className='buttonAddRemove'
        />
      </div>
      <DivImage bgImage={ingredient.image}/>
    </PortionDetail>
  )
}

export default Portion;