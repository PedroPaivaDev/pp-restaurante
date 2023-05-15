import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import getPortions from '@/helper/getPortions';
import Button from './Forms/Button';

const DivMarmitaDetails = styled.div`
  display: flex;
  gap: 10px;
  .bgPapel {
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
  }
  .detailsButtons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
  }
`;
interface PropsMarmitaDetails {
  marmita: BagMarmita;
  id: string;
  bag: Bag;
  setBag: React.Dispatch<React.SetStateAction<Bag>>;
}
const MarmitaDetails = ({marmita, id, bag, setBag}:PropsMarmitaDetails) => {
  const {push} = useRouter();
  function handleRemove() {
    if(confirm(`Tem certeza que você deseja remover esta marmita?`)) {
      const newBag = JSON.parse(JSON.stringify(bag));
      delete newBag[id];
      setBag({newBag});
    } else return
  }
  
  function handleEdit() {
    if(confirm(`ATENÇÃO! Você já estava montando uma marmita. Caso você queira continuar montando a marmita, clique em "Cancelar". Caso você queira descartar a marmita que estava sendo montada e editar esta, clique em "OK"`)) {
      push('/menu');
    } else return
  }

  return (
    <DivMarmitaDetails>
      <div className='bgPapel'>
        <div className='detailsButtons'>
          <Button label='Editar' onClick={handleEdit}/>
          <Button label='Remover' onClick={handleRemove}/>
        </div>
        <span>{marmita.size}: {id.substring(4)}</span>
        {getPortions(marmita.portions).map(item => <p key={item}>{item}</p>)}
      </div>
    </DivMarmitaDetails>
  )
}

export default MarmitaDetails;