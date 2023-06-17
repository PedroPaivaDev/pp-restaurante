import React from 'react';

import Grid from '@/components/Grid';
import Portion from '@/components/Portion';
import Arrow from './Arrow';

interface PropsProducts {
  menu:MenuProducts;
  category:string;
  marmita: Marmita;
  setMarmita: React.Dispatch<React.SetStateAction<Marmita>>;
}
const Products = ({menu, category, marmita, setMarmita}:PropsProducts) => {
  return (
    <div key={category} className={`container`}>
      <Arrow menu={menu}/>
      <div className='envelope animeLeft'>
        <h1 style={{marginTop: '40px'}}>{menu[category].title}</h1>
        <p>{menu[category].description}</p>
        {Object.keys(menu[category].products).map(type => 
          <div key={menu[category].products[type].title} className='wrapper'>
            <h2>{menu[category].products[type].title}</h2>
            <p>{menu[category].products[type].description}</p>
            <div className='row'>
              {menu[category].products[type].products &&
                Object.keys(menu[category].products[type].products).filter(item => menu[category].products[type].products[item].available).map((item) => (
                  <Grid
                    key={menu[category].products[type].products[item].id}
                    xs={12} sm={6} md={4} lg={3}
                  >
                    <Portion
                      ingredient={menu[category].products[type].products[item]}
                      marmita={marmita} setMarmita={setMarmita}
                    />
                  </Grid>
                ))
              }
            </div>
          </div>)
        }
      </div>
    </div>
  );  
}

export default Products;