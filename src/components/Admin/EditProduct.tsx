import React from 'react';

import { getProducts } from '@/services/firebase';
import getMenuProductsIdsByCategories from '@/helper/getMenuProductsIdsByCategories';

import Grid from '../Grid';
import PortionAdmin from './PortionAdmin';

const EditProduct = () => {
  const [menu, setMenu] = React.useState<Menu>();
  const [products, setProducts] = React.useState<ObjectArrayString|null>(null);

  function getType(id:string) {
    return id.split('-')[0];
  }

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[]);  

  React.useEffect(() => {
    menu && setProducts(getMenuProductsIdsByCategories(menu.products))
  },[menu])

  return (
    <div>
      <h1>Editar Produtos</h1>
      {products && menu &&
        <div className='envelope animeLeft'>
          {Object.keys(products).map(category =>
            <div key={category} className='wrapper'>
              <h2>{category.toUpperCase()}</h2>
              <div className='row'>
                {products[category].map(id =>
                  <Grid key={id}
                    xs={12} sm={6} md={4} lg={3}
                  >
                    <PortionAdmin
                      ingredient={menu.products[category].products[getType(id)].products[id]}
                    />
                  </Grid>
                )}
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default EditProduct;