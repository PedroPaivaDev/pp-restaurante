import React from 'react';

import Grid from '@/components/Grid';
import Portion from '@/components/Portion';

const Products = ({menu, category}:{menu:MenuProducts,category:string}) => {
  return (
    <div key={category} className={`container`}>
      {menu[category] && <div className='envelope animeLeft'>
        <h1>{menu[category].title}</h1>
        <p>{menu[category].description}</p>
        {Object.keys(menu[category].products).map(type => 
          <div key={menu[category].products[type].title} className='wrapper'>
            <h2>{menu[category].products[type].title}</h2>
            <p>{menu[category].products[type].description}</p>
            <div className='row'>
              { menu[category].products[type].products &&
                Object.keys(menu[category].products[type].products).map((item) => (
                  <Grid
                    key={menu[category].products[type].products[item].id}
                    xs={12} sm={6} md={4} lg={3}
                  >
                    <Portion ingredient={menu[category].products[type].products[item]}/>
                  </Grid>
                ))
              }
            </div>
          </div>)
        }
      </div>}
    </div>
  );  
}

export default Products;