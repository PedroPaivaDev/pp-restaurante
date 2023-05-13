import React from 'react';
import Grid from './Grid';
import Portion from './Portion';

interface PropsMarmita {
  menu: Menu;
  marmita: Marmita;
  setMarmita: React.Dispatch<React.SetStateAction<Marmita>>;
}
const Marmita = ({menu, marmita, setMarmita}: PropsMarmita) => {

  function splitId(id:string) {
    const idSplitedArray = id.split('-');
    return idSplitedArray;
  }

  return (
    <div className='row'>
      {marmita && menu && Object.keys(marmita).map(category =>
        marmita[category].map(portionId =>
          <Grid xs={12} sm={6} md={4} lg={3} key={portionId}>
            <Portion
              ingredient={menu?.products[category].products[splitId(portionId)[0]].products[portionId] as Portion}
              marmita={marmita} setMarmita={setMarmita}
            />
          </Grid>
        )
      )}
    </div>
  )
}

export default Marmita;