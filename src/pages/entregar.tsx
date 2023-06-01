import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { MarmitaContext } from '@/contexts/MarmitaContext';
import { getProducts } from '@/services/firebase';

import OrderMarmita from '@/components/OrderMarmita';
import Order from '@/components/Order';
import Grid from '@/components/Grid';
import Button from '@/components/Forms/Button';

const DivEnvelope = styled.div`
  .empty {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    .buttonMenu {
      justify-content: center;
    }
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
        <DivEnvelope>
          <h1>Finalizar Pedido</h1>
          {bagWithMarmita ?
            <div className='wrapper'>
              <p>{`Confira com atenção todos os itens, preencha seu endereço de entrega e clique no botão "enviar" ao final.`}</p>
              <div className='row'>
                {bagStorage && menu && Object.keys(bagStorage).map(marmitaId =>
                  <Grid key={marmitaId} xs={12} sm={6} md={4} lg={4}>
                    <OrderMarmita
                      marmita={bagStorage[marmitaId]} id={marmitaId}
                      bag={bagStorage} setBag={setBagStorage}
                      setMarmitaStorage={setMarmitaStorage} menu={menu as Menu}
                    />
                  </Grid>
                )}
              </div>
            </div> :
            <div className='empty'>
              <p>Você ainda não montou uma marmita...</p>
              <Button
                label='Começar a Montar'
                onClick={() => push('/menu?categoria=bases')}
                className='buttonMenu'
              />
            </div>
          }
          {bagWithMarmita && menu &&
            <Order bag={bagStorage} menu={menu}/>
          }
        </DivEnvelope>
      </div>
    </div>
  )
}

export default Entrega;