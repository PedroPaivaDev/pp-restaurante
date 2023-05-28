import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import getPortions from '@/helper/getPortions';
import Button from './Forms/Button';
import { MarmitaContext } from '@/contexts/MarmitaContext';
import getNameById from '@/helper/getNameById';

const DivMarmitaDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${props => props.theme.colors.portionBg};
  background-position: center center;
  background-size: cover;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  box-shadow: 0px 7px 20px 0px ${props => props.theme.colors.dark};
  padding: 10px;  
  width: 250px;
  height: 100%;
  padding: 10px 10px 10px 10px;
  * {
    color: ${props => props.theme.colors.primaryColor};    
  }
  .detailsButtons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
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
    <DivMarmitaDetails>
      <div className='detailsButtons'>
        <Button label='Editar' onClick={handleEdit}/>
        <Button label='Remover' onClick={handleRemove}/>
      </div>
      <span>{marmita.size}: {id.substring(4)}</span>
      {
        marmita.portions &&
        getPortions(getNameById(marmita.portions as MarmitaPortions, menu.products)).map(itemName => 
          <p key={itemName}>{itemName}</p>
        )
      }
      <h3>R${marmita.price.toFixed(2)}</h3>
    </DivMarmitaDetails>
  )
}

export default OrderMarmita;