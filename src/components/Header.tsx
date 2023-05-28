import React from 'react';
import styled from "styled-components";

import Link from 'next/link';
import { useRouter } from 'next/router';
import { MarmitaContext } from '@/contexts/MarmitaContext';
import getPortions from '@/helper/getPortions';

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
      position: relative;
      border-radius: 20px;
      transition: 0.3s;
      text-shadow: 1px 1px 5px ${props => props.theme.colors.dark};
      line-height: 26px;
      text-align: center;
      vertical-align: middle;
      &:hover, &.active, .active .icon>*, &:hover .icon>* {
        background: ${props => props.theme.colors.tertiaryColor};
        box-shadow: 0 0 10px 10px ${props => props.theme.colors.tertiaryColor};
        color: ${props => props.theme.colors.primaryColor};
        text-shadow: none;
      }
      .icon {
        margin-bottom: 3px;
        margin-right: 3px;
      }
      .active .icon, &:hover .icon {
        fill: ${props => props.theme.colors.primaryColor};
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
  .bagCount {
    position: absolute;
    text-align: center;
    left: 12px;
    top: -8px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.75rem;
    color: white;
    background-color: #f31;
    width: 16px;
    line-height: 16px;
    border-radius: 8px;
  }
`;

const Header = () => {
  const {marmitaStorage, bagStorage} = React.useContext(MarmitaContext);
  const {pathname, push} = useRouter();
  const [marmitaCount, setMarmitaCount] = React.useState<string[]>();
  const [bagCount, setBagCount] = React.useState<string[]>();

  React.useEffect(() => {
    if(bagStorage) {
      setBagCount(Object.keys(bagStorage))
    } else {
      setBagCount([])
    }
  },[bagStorage]);

  React.useEffect(() => {
    if(marmitaStorage.portions) {
      setMarmitaCount(getPortions(marmitaStorage.portions))
    } else {
      setMarmitaCount([])
    }
  },[marmitaStorage]);

  return (
    <HeaderTag style={{width: '100%'}}>
      <nav>
        <Link href='/menu' className={pathname==='/menu' ? 'active' : ''}>
          {marmitaCount && marmitaCount.length>=1 &&
            <span className='bagCount'>{marmitaCount.length}</span>
          }
          <object className='icon' data='/bowlfood.svg'/>
          Marmita
        </Link>
        <div className={`logoImg ${pathname==='/' ? 'active' : ''}`} onClick={() => push('/')}>
          {/* eslint-disable-next-line */}
          <img src="/logo.png" alt="LogoPP" height='50px'/>
        </div>
        <Link href='/entregar' className={pathname==='/entregar' ? 'active' : ''}>
          {bagCount && bagCount.length>=1 &&
            <span className='bagCount'>{bagCount.length}</span>
          }
          <object className='icon' data='/handbag.svg'/>
          Entrega
        </Link>
      </nav>
    </HeaderTag>
  )
}

export default Header;