import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Products from '../components/Products';
import { getProducts } from '@/services/firebase';

const SubNavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.secondaryColor};
  width: 100%;

  .navLinks {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      max-width: 900px;
  }

  .navLinks a {
      color: ${props => props.theme.colors.quintenaryColor};
      text-shadow: none;
      line-height: 30px;
      transition: 0.3s;
  }

  .activeProducts, a:hover {
      color: ${props => props.theme.colors.primaryColor};
  }
`;

const Menu = () => {
  const {asPath} = useRouter();
  const [menu, setMenu] = React.useState<Menu>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  return (
    <div className='page animeleft'>
      <SubNavBar>
        <div className='navLinks'>
          <Link href="/menu?bases">Base</Link>
          <Link href="/menu?hortalicas">Hortaliças</Link>
          <Link href="/menu?acompanhamentos">Preparos</Link>
          <Link href="/menu?carnes">Carnes</Link>
        </div>
      </SubNavBar>
      {asPath==='/menu' && menu &&
        <>
          <h1>{menu?.title}</h1>
          <p>{menu?.description1}</p>
        </>
      }
      {asPath.split('?')[1] && menu &&
        <Products menu={menu?.products as MenuProducts} category={asPath.split('?')[1]}/>
      }
    </div>
  )
};

export default Menu;