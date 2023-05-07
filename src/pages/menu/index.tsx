import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';
// import { useRouter } from 'next/router';

import { getProducts } from '../../services/firebase';
import Products from './[Products]';

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
  // const {pathname} = useRouter();
  // const [category, setCategory] = React.useState<string>();
  const [base, setBase] = React.useState<Category>();
  // const [hortalicas, setHortalicas] = React.useState();
  // const [acompanhamentos, setAcompanhamentos] = React.useState();
  // const [carnes, setCarnes] = React.useState();

  React.useEffect(() => {
    getProducts('hortalicas', setBase as React.Dispatch<React.SetStateAction<Category>>);
  },[]);

  // React.useEffect(() => {
  //   setCategory(pathname);
  // }, [pathname])

  return (
    <div className='page animeleft'>
      <SubNavBar>
        <div className='navLinks'>
          <Link href="/menu/base">Base</Link>
          <Link href="/menu/hortalicas">Hortaliças</Link>
          <Link href="/menu/acompanhamentos">Preparos</Link>
          <Link href="/menu/carnes">Carnes</Link>
        </div>
      </SubNavBar>
      {/* category==='/menu' && */ base &&
        <Products category={base}/>
      }
    </div>
  )
};

export default Menu;