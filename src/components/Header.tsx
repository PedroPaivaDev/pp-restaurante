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
  background-color: var(--primaryColor);
  width: 100%;
  height: 60px;
  border-bottom: 3px solid black;
  border-top: 3px solid black;
  a {
    border-radius: 20px;
    transition: 0.3s;
    text-shadow: 1px 1px 5px black;
    line-height: 26px;
    text-align: center;
    vertical-align: middle;
    &:hover, &.active {
      background: var(--tertiaryColor);
      box-shadow: 0 0 10px 10px var(--tertiaryColor);
      color: var(--primaryColor);
      text-shadow: none;
    }
  }
  .active {
    background: var(--tertiaryColor);
    box-shadow: 0 0 10px 10px var(--tertiaryColor);
    color: var(--primaryColor);
    text-shadow: none;
  }
`;

const Header = () => {

  const {pathname} = useRouter();

  return (
    <header style={{width: '100%'}}>
      <Nav>
        <Link href='/Menu' className={pathname==='/Menu' ? 'active' : ''}>Cardápio</Link>
        <Link href='/' className={pathname==='/' ? 'active' : ''}>
          <Image
              src="/logo.png"
              alt="LogoPP"
              width={100}
              height={50}
          />
        </Link>
        <Link href='/Entrega' className={pathname==='/Entrega' ? 'active' : ''}>Entrega</Link>
      </Nav>
    </header>
  )
}

export default Header;