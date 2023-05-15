import React from 'react';
import styled from 'styled-components';

import { MarmitaContext } from '@/contexts/MarmitaContext';
import { getProducts } from '@/services/firebase';
import getNameById from '@/helper/getNameById';

import MarmitaDetails from '@/components/MarmitaDetails';

const DivMarmitas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Entrega = () => {
  const {bagStorage, setBagStorage} = React.useContext(MarmitaContext);
  const [marmitasWithNames, setMarmitasWithNames] = React.useState<Bag>();
  const [menu, setMenu] = React.useState<Menu>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[])

  React.useEffect(() => {
    if(bagStorage && menu) {
      let newBag = {}
      Object.keys(bagStorage).forEach(marmita => {
        newBag = {
          ...newBag,
          [marmita]: {
            ...bagStorage[marmita],
            portions: getNameById(bagStorage[marmita].portions, menu.products),
          }
        }        
      })
      setMarmitasWithNames(newBag)
    }
  },[bagStorage, menu])

  return (
    <div className='page animeLeft'>
      <div className='container'>
        <div className='envelope'>
          <h1>Finalizar Pedido</h1>
          <p>{`Confira com atenção todos os itens, preencha seu endereço de entrega e clique no botão "enviar" ao final.`}</p>
          <div className='wrapper'>
            <DivMarmitas>
              {marmitasWithNames && Object.keys(marmitasWithNames).map(marmitaId =>
                <MarmitaDetails key={marmitaId}
                  marmita={marmitasWithNames[marmitaId]} id={marmitaId}
                  bag={bagStorage} setBag={setBagStorage}
                />
              )}
            </DivMarmitas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entrega;