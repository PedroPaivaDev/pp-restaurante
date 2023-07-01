import React from 'react';

import splitPortionId from '@/helper/splitPortionId';
import Grid from './Grid';
import Portion from './Portion';

interface PropsMarmita {
  menu: Menu;
  marmita: Marmita;
  setMarmita: React.Dispatch<React.SetStateAction<Marmita>>;
}
const Marmita = ({menu, marmita, setMarmita}: PropsMarmita) => {

  return (
    <div className='row'>
      {marmita.portions && menu && Object.keys(marmita.portions).map(category =>
        marmita.portions && marmita.portions[category].map(portionId =>
          <Grid xs={12} sm={6} md={4} lg={3} key={portionId}>
            <Portion
              ingredient={menu?.products[category].products[splitPortionId(portionId).type].products[portionId] as Portion}
              marmita={marmita} setMarmita={setMarmita}
            />
          </Grid>
        )
      )}
    </div>
  )
}

export default Marmita;