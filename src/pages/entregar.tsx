import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { MarmitaContext } from '@/contexts/MarmitaContext';
import { getData } from '@/services/firebase';
import withAuth from '@/utils/withAuth';
import getPortions from '@/helper/getPortions';
import splitPortionId from '@/helper/splitPortionId';

import Order from '@/components/Order/Order';
import Grid from '@/components/Grid';
import Button from '@/components/Forms/Button';
import OrderMarmita from '@/components/Order/OrderMarmita';

const DivEnvelope = styled.div`
  .empty {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
`;

const Entrega = () => {
  const {bagStorage, setBagStorage, setMarmitaStorage} = React.useContext(MarmitaContext);
  const [menu, setMenu] = React.useState<Menu|null>(null);
  const {push} = useRouter();
  const [bagWithMarmita, setBagWithMarmita] = React.useState<boolean>();
  const [unavailable, setUnavailable] = React.useState<string[]>([]);

  React.useEffect(() => {
    if(Object.keys(bagStorage).length){
      setBagWithMarmita(true)
    } else {
      setBagWithMarmita(false)
    }
  },[bagStorage])

  React.useEffect(() => {
    getData<Menu|null>('cardapio', setMenu)
  },[]);

  React.useEffect(() => {
    if(bagStorage && menu) {
      const unavailableArray:string[] = [];
      Object.keys(bagStorage).forEach(marmitaId => {
        getPortions(bagStorage[marmitaId].portions).forEach(portionId => {
          const {category, type} = splitPortionId(portionId);
          if(!menu.products[category].products[type].products[portionId].available) {
            unavailableArray?.push(portionId)
          }
        })
      });
      setUnavailable(unavailableArray);
    }
  },[bagStorage, menu]);

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
              />
            </div>
          }
          {bagWithMarmita && menu &&
            <Order bag={bagStorage} menu={menu} unavailable={unavailable}/>
          }
        </DivEnvelope>
      </div>
    </div>
  )
}

export default withAuth(Entrega);