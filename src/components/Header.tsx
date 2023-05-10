import React from 'react';
import styled from "styled-components";

import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderTag = styled.nav`
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--mainWidth);
  height: var(--HeaderHeigth);
  background-color: ${props => props.theme.colors.primaryColor};
  border-top: 3px solid ${props => props.theme.colors.dark};
  border-bottom: 3px solid ${props => props.theme.colors.dark};
  z-index: 1;
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 600px;
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
    .logoImg {
      border-radius: 20px;
      transition: 0.3s;
      cursor: pointer;
    }
    .logoImg:hover, .active {
      background: ${props => props.theme.colors.tertiaryColor};
      box-shadow: 0 0 10px 10px ${props => props.theme.colors.tertiaryColor};
    }
  }
`;

const Header = () => {

  const {pathname, push} = useRouter();

  return (
    <HeaderTag style={{width: '100%'}}>
      <nav>
        <Link href='/Menu' className={pathname==='/Menu' ? 'active' : ''}>
          Cardápio
        </Link>
        <div className={`logoImg ${pathname==='/' ? 'active' : ''}`} onClick={() => push('/')}>
          <img src="/logo.png" alt="LogoPP" height='50px'/>
        </div>
        <Link href='/Entrega' className={pathname==='/Entrega' ? 'active' : ''}>
          Entrega
        </Link>
      </nav>
    </HeaderTag>
  )
}

export default Header;