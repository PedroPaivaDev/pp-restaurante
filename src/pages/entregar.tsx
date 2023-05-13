import React from 'react';
import { MarmitaContext } from '@/contexts/MarmitaContext';

import MarmitaDetails from '@/components/MarmitaDetails';
import Grid from '@/components/Grid';
import { getProducts } from '@/services/firebase';
import getNameById from '@/helper/getNameById';

const Entrega = () => {
  const {bagStorage} = React.useContext(MarmitaContext);
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
          [marmita]: getNameById(bagStorage[marmita], menu.products)
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
          <div className='wrapper'>
            <div className="row">
              {marmitasWithNames && Object.keys(marmitasWithNames).map(marmitaId => 
                <Grid key={marmitaId} xs={12} sm={6} md={4} lg={3}>
                  <MarmitaDetails
                    marmita={marmitasWithNames[marmitaId]}
                  />
                </Grid>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entrega;