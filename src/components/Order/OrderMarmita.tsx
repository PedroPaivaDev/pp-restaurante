import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { MarmitaContext } from '@/contexts/MarmitaContext';
import getPortions from '@/helper/getPortions';
import splitPortionId from '@/helper/splitPortionId';
import getNameById from '@/helper/getNameById';

import Button from '../Forms/Button';

const DivMarmitaDetails = styled.div`
  gap: 5px;
  margin: 0 20px;
  span {
    width: 100%;
  }
  .detailsButtons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
  }
  .unavailable {
    color: ${props => props.theme.colors.error};
    cursor: pointer;
    &:hover {
      text-decoration: line-through;
    }
    width: auto;
    .trash {
      margin-left: 5px;
    }
  }
  h3 {
    width: 100%;
    text-align: right;
  }
`;

interface PropsMarmitaDetails {
  marmita: MarmitaOnBag;
  id: string;
  bag: Bag;
  setBag: React.Dispatch<React.SetStateAction<Bag>>;
  setMarmitaStorage: React.Dispatch<React.SetStateAction<Marmita>>;
  menu: Menu;
}

const OrderMarmita = ({marmita, id, bag, setBag, menu}:PropsMarmitaDetails) => {
  const {push} = useRouter();
  const {marmitaStorage, setMarmitaStorage} = React.useContext(MarmitaContext);

  function handleRemove() {
    if(confirm(`Tem certeza que você deseja remover esta marmita?`)) {
      const newBag = JSON.parse(JSON.stringify(bag));
      delete newBag[id];
      setBag(newBag);
    } else return
  }
  
  function handleEdit() {
    if(marmitaStorage.portions && Object.keys(marmitaStorage.portions).length>0) {
      if(confirm(`ATENÇÃO! Você já estava montando uma marmita. Caso você queira continuar montando a marmita, clique em "Cancelar". Caso você queira descartar a marmita que estava sendo montada e editar esta, clique em "OK"`)) {
        setMarmitaStorage(marmita)
        const newBag:Bag = JSON.parse(JSON.stringify(bag));
        delete newBag[id];
        setBag(newBag);
        push('/menu');
      } else return
    } else {
      setMarmitaStorage(marmita)
      const newBag:Bag = JSON.parse(JSON.stringify(bag));
      delete newBag[id];
      setBag(newBag);
      push('/menu');
    }
  }

  function handleDeletePortion(marmitaId:string, portionId:string) {
    let newBag:Bag = JSON.parse(JSON.stringify(bag));
    const {category} = splitPortionId(portionId);
    if(confirm(`Infelizmente o item ${getNameById(portionId,menu.products)} ficou indisponível alguns segundos atrás. Deseja removê-lo desta marmita?`)) {
      if(newBag[marmitaId].portions[category].length>1) {
        newBag = {
          ...newBag,
          [marmitaId]: {
            ...newBag[marmitaId],
            portions: {
              ...newBag[marmitaId].portions,
              [category]: newBag[marmitaId].portions[category].filter(id => id !== portionId)
            }
          }
        }
        setBag(newBag);
      } else {
        delete newBag[marmitaId].portions[category];
        setBag(newBag);
      }
    } else {
      return;
    }
  }

  return (
    <DivMarmitaDetails className='bgPaper'>
      <div className='detailsButtons'>
        <Button label='Editar' onClick={handleEdit}/>
        <Button label='Remover' onClick={handleRemove}/>
      </div>
      <span>{marmita.size}: {id.substring(4)}</span>
      {
        marmita.portions &&
        getPortions(marmita.portions).map(portionId => {
          const {category, type} = splitPortionId(portionId);
          if(menu.products[category].products[type].products[portionId].available) {
            return <p key={portionId}>
              {getNameById(portionId, menu.products)}
            </p>            
          } else {
            return <p 
              className='unavailable'
              key={portionId}
              onClick={() => handleDeletePortion(marmita.id, portionId)}
            >
              {getNameById(portionId, menu.products)}
              <Image
                src={'./trash.svg'}
                alt='trash'
                width={25}
                height={25}
                className='trash'
              />
            </p>
          }
        }
        )
      }
      <h3>R${marmita.price.toFixed(2)}</h3>
    </DivMarmitaDetails>
  )
}

export default OrderMarmita;