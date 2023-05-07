import React from 'react';
import { useRouter } from 'next/router';

import { getProducts } from '@/services/firebase';
import Products from '../components/Products';
import SubNavBar from '@/components/SubNavBar';

const Menu = () => {
  const {query} = useRouter();
  const [menu, setMenu] = React.useState<Menu>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  return (
    <div className='page animeleft'>
      <SubNavBar 
        categories={['bases', 'hortalicas', 'preparos', 'carnes']}
        path={query.categoria as string}
      />
      {query.categoria===undefined && menu && 
        <>
          <h1>{menu.title}</h1>
          <p>{menu.description1}</p>
        </>
      }
      {query.categoria && menu &&
        <Products menu={menu?.products as MenuProducts} category={`${query.categoria}`}/>
      }
    </div>
  )
};

export default Menu;