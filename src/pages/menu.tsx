import React from 'react';
import { useRouter } from 'next/router';

import { getProducts } from '@/services/firebase';
import Products from '../components/Products';
import SubNavBar from '@/components/SubNavBar';
import Button from '@/components/Button';

const Menu = () => {
  const {query, push} = useRouter();
  const [menu, setMenu] = React.useState<Menu>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  function handleClick() {
    push('/menu?categoria=bases');
  }

  return (
    <div className='page animeleft'>
      {menu && <SubNavBar 
        categories={Object.keys(menu?.products)}
        path={query.categoria as string}
      />}
      {query.categoria===undefined && menu && 
        <div className='wrapper'>
          <h1>{menu.title}</h1>
          <p>{menu.description1}</p>
          <Button label='Montar Marmita' onClick={handleClick}/>
        </div>
      }
      {query.categoria && menu &&
        <Products menu={menu?.products as MenuProducts} category={`${query.categoria}`}/>
      }
    </div>
  )
};

export default Menu;