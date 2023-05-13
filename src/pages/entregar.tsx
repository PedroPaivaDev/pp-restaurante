import React from 'react';
import { MarmitaContext } from '@/contexts/MarmitaContext';

import MarmitaDetails from '@/components/MarmitaDetails';
import Grid from '@/components/Grid';

const Entrega = () => {
  const {bagStorage} = React.useContext(MarmitaContext);

  return (
    <div className='page animeLeft'>
      <div className='container'>
        <div className='envelope'>
          <h1>Finalizar Pedido</h1>
          <div className='wrapper'>
            <div className="row">
              {Object.keys(bagStorage).map(marmitaId => 
                <Grid key={marmitaId} xs={12} sm={6} md={4} lg={3}>
                  <MarmitaDetails marmita={bagStorage[marmitaId]}/>
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