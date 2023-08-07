import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@/components/Grid';
import Portion from '@/components/Portion';
import Arrow from './Arrow';
import Slider from './Slider';

interface PropsProducts {
  menu:MenuProducts;
  category:string;
  marmita: Marmita;
  setMarmita: React.Dispatch<React.SetStateAction<Marmita>>;
}
const Products = ({menu, category, marmita, setMarmita}:PropsProducts) => {
  const {query, push} = useRouter();
  const [animeDirection, setAnimeDirection] = React.useState('animeRight');

  function handleSwipe(direction: 'right' | 'left') {
    const categories = Object.keys(menu);
    const currentCategoryIndex = categories.indexOf(query.categoria as string);
    if(currentCategoryIndex > 0 && direction==='right') {
      setAnimeDirection('animeLeft');
      push(`/menu?categoria=${categories[currentCategoryIndex - 1]}`);
    } else if(currentCategoryIndex < (categories.length-1) && direction==='left') {
      setAnimeDirection('animeRight');
      push(`/menu?categoria=${categories[currentCategoryIndex + 1]}`);
    } else {
      return;
    }
  }

  return (
    <>
      <Arrow menu={menu} setAnimeDirection={setAnimeDirection}/>
      <div key={category} className={`container ${animeDirection}`}>
        <Slider onSwipe={handleSwipe} className='envelope'>
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
        </Slider>
      </div>
    </>
  );  
}

export default Products;