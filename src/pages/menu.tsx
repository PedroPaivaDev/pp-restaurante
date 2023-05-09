import React from 'react';
import { useRouter } from 'next/router';

import { getProducts } from '@/services/firebase';

import Products from '../components/Products';
import SubNavBar from '@/components/SubNavBar';
import Button from '@/components/Button';
import useLocalStorage from '@/hooks/useLocalStorage';

const Menu = () => {
  const {query, push} = useRouter();
  const [menu, setMenu] = React.useState<Menu>();
  const [marmita, setMarmita] = useLocalStorage<{[key: string]: string[]}>('marmita', {});

  const buttonDiv = {
    position: 'absolute',
    top: '95px',
    width: '100%',
    maxWidth: '900px',
    zIndex: 10
  }

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  function handleClick() {
    push('/Menu?categoria=bases');
  }

  function handleSubmit() {
    console.log('Marmita armazenada')
  }

  return (
    <div className='page animeleft'>
      {menu && <SubNavBar 
        categories={Object.keys(menu?.products)}
        path={query.categoria as string}
      />}
      {Object.keys(marmita).length>2 &&
        <div style={buttonDiv as object}>
          <Button
            label='Concluir Marmita'
            className='submitButton'
            onClick={handleSubmit}
          />
        </div>
      }
      {query.categoria===undefined && menu && 
        <div className='wrapper'>
          <h1>{menu.title}</h1>
          <p>{menu.description1}</p>
          <Button label='Montar Marmita' onClick={handleClick}/>
        </div>
      }
      {query.categoria && menu &&
        <Products
          menu={menu?.products as MenuProducts}
          category={`${query.categoria}`}
          marmita={marmita} setMarmita={setMarmita}
        />
      }
    </div>
  )
};

export default Menu;