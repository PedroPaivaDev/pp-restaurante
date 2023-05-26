import React from 'react';
import styled from 'styled-components';

import { MarmitaContext } from '@/contexts/MarmitaContext';
import { getProducts } from '@/services/firebase';

import OrderMarmita from '@/components/OrderMarmita';
import Button from '@/components/Forms/Button';
import { useRouter } from 'next/router';
import Order from '@/components/Order';

const DivMarmitas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const DivEmpty = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  .buttonMenu {
    justify-content: center;
  }
`;

const Entrega = () => {
  const {bagStorage, setBagStorage, setMarmitaStorage} = React.useContext(MarmitaContext);
  const [menu, setMenu] = React.useState<Menu>();
  const {push} = useRouter();
  const [bagWithMarmita, setBagWithMarmita] = React.useState<boolean>();

  React.useEffect(() => {
    if(Object.keys(bagStorage).length){
      setBagWithMarmita(true)
    } else {
      setBagWithMarmita(false)
    }
  },[bagStorage])

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[])

  return (
    <div className='page animeLeft'>
      <div className='container'>
        <div className='envelope'>
          <h1>Finalizar Pedido</h1>
          {bagWithMarmita ?
            <div className='wrapper'>
              <p>{`Confira com atenção todos os itens, preencha seu endereço de entrega e clique no botão "enviar" ao final.`}</p>
              <DivMarmitas>
                {bagStorage && menu && Object.keys(bagStorage).map(marmitaId =>
                  <OrderMarmita key={marmitaId}
                    marmita={bagStorage[marmitaId]} id={marmitaId}
                    bag={bagStorage} setBag={setBagStorage}
                    setMarmitaStorage={setMarmitaStorage} menu={menu as Menu}
                  />
                )}
              </DivMarmitas>
            </div> :
            <DivEmpty>
              <p>Você ainda não montou uma marmita...</p>
              <Button
                label='Começar a Montar'
                onClick={() => push('/menu?categoria=bases')}
                className='buttonMenu'
              />
            </DivEmpty>
          }
          {bagWithMarmita &&
            <Order/>
          }
        </div>
      </div>
    </div>
  )
}

export default Entrega;