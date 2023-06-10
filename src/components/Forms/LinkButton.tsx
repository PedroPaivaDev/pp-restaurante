import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const DivLink = styled.div`
  display: flex;
  justify-content: center;
  a {
    background-color: ${props => props.theme.colors.quaternaryColor};
    padding: 0px 10px;
    line-height: 26px;
    border: 1px solid ${props => props.theme.colors.quintenaryColor};
    border-radius: 10px;
    color: ${props => props.theme.colors.primaryColor};
    box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
    transition: 0.3s;
    &:hover {
      background-color: ${props => props.theme.colors.quintenaryColor};
    }
  }
`;

interface PropsLinkButton {
  label: string;
  href: string;
}

const LinkButton = ({label, href}:PropsLinkButton) => {
  return (
    <DivLink>
      <Link href={href}>{label}</Link>
    </DivLink>
  )
}

export default LinkButton;