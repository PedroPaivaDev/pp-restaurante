import React from 'react';
import styled from 'styled-components';
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
  del {
    color: ${props => props.theme.colors.error};
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
  const {marmitaStorage, setMarmitaStorage} = React.useContext(MarmitaContext)

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
        const newBag = JSON.parse(JSON.stringify(bag));
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
            return <del key={portionId}>{getNameById(portionId, menu.products)}</del>
          }
        }
        )
      }
      <h3>R${marmita.price.toFixed(2)}</h3>
    </DivMarmitaDetails>
  )
}

export default OrderMarmita;