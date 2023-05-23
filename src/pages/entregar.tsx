import React from 'react';
import styled from 'styled-components';

import { MarmitaContext } from '@/contexts/MarmitaContext';
import { getProducts } from '@/services/firebase';

import OrderMarmita from '@/components/OrderMarmita';

const DivMarmitas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Entrega = () => {
  const {bagStorage, setBagStorage, setMarmitaStorage} = React.useContext(MarmitaContext);
  const [menu, setMenu] = React.useState<Menu>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[])

  return (
    <div className='page animeLeft'>
      <div className='container'>
        <div className='envelope'>
          <h1>Finalizar Pedido</h1>
          <p>{`Confira com atenção todos os itens, preencha seu endereço de entrega e clique no botão "enviar" ao final.`}</p>
          <div className='wrapper'>
            <DivMarmitas>
              {bagStorage && menu && Object.keys(bagStorage).map(marmitaId =>
                <OrderMarmita key={marmitaId}
                  marmita={bagStorage[marmitaId]} id={marmitaId}
                  bag={bagStorage} setBag={setBagStorage}
                  setMarmitaStorage={setMarmitaStorage} menu={menu as Menu}
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