import React from 'react';
import styled from "styled-components";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.theme.colors.primaryColor};
  width: 100%;
  height: 60px;
  border-bottom: 3px solid ${props => props.theme.colors.dark};
  border-top: 3px solid ${props => props.theme.colors.dark};
  a {
    border-radius: 20px;
    transition: 0.3s;
    text-shadow: 1px 1px 5px ${props => props.theme.colors.dark};
    line-height: 26px;
    text-align: center;
    vertical-align: middle;
    &:hover, &.active {
      background: ${props => props.theme.colors.tertiaryColor};
      box-shadow: 0 0 10px 10px ${props => props.theme.colors.tertiaryColor};
      color: ${props => props.theme.colors.primaryColor};
      text-shadow: none;
    }
  }
`;

const Header = () => {

  const {pathname} = useRouter();

  return (
    <header style={{width: '100%'}}>
      <Nav>
        <Link href='/menu' className={pathname==='/menu' ? 'active' : ''}>Cardápio</Link>
        <Link href='/' className={pathname==='/' ? 'active' : ''}>
          <Image
              src="/logo.png"
              alt="LogoPP"
              width={100}
              height={50}
          />
        </Link>
        <Link href='/entrega' className={pathname==='/entrega' ? 'active' : ''}>Entrega</Link>
      </Nav>
    </header>
  )
}

export default Header;