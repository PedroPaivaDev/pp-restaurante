import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

const NavBar = styled.nav`
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
    a {
      color: ${props => props.theme.colors.quintenaryColor};
      text-shadow: none;
      line-height: 30px;
      transition: 0.3s;
    }
    .active, a:hover {
      color: ${props => props.theme.colors.primaryColor};
    }
  }
`;

interface PropsSubNavBar {
  categories: string[];
  path: string;
  endpoint: string;
}

const SubNavBar = ({categories, path, endpoint}:PropsSubNavBar) => {
  return (
    <NavBar>
      <div className='navLinks'>
        {categories.map(category =>
          <Link
            key={category}
            href={`/${path}?categoria=${category}`}
            className={endpoint===category ? 'active' : ''}
          >
            {category}
          </Link>
        )}
      </div>
    </NavBar>
  )
}

export default SubNavBar;