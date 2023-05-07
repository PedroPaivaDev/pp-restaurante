import React from 'react';

import styled from 'styled-components';

const getWidthString = (number: number) => {
  if (!number) return;

  const width: number = (number / 12) * 100;

  return `width: ${width}%;`;
};

export const Column = styled.div<GridProps>`
  padding: 15px;
  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%')};
  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }
  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;

interface GridProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  children?: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ xs, sm, md, lg, children }) => {
  return (
    <>
      <Column xs={xs} sm={sm} md={md} lg={lg}>
        {children}
      </Column>
    </>
  );
};

export default Grid;