import React from 'react';

import Grid from '@/components/Grid';
import Portion from '@/components/Portion';

const Products = ({category}: {category: Category}) => {

  return (
    <div className={`container animeLeft`}>
      {category && <div className='envelope'>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        {Object.keys(category.products).map(type => 
          <div key={category.products[type].title} className='wrapper'>
            <h2>{category.products[type].title}</h2>
            <p>{category.products[type].description}</p>
            <div className='row'>
              { category.products[type].products &&
                Object.keys(category.products[type].products).map((item) => (
                  <Grid
                    key={category.products[type].products[item].id}
                    xs='12' sm='6' md='4' lg='3'
                  >
                    <Portion ingredient={category.products[type].products[item]}/>
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