import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ArrowButton = styled.div`
  position: absolute;
    top: 120px;
  z-index: 10;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  div {
    background-color: white;
    border-radius: 15px;
  }
`;

interface PropsArrow {
  menu: MenuProducts
}

const Arrow = ({menu}:PropsArrow) => {
  const {query, push} = useRouter();

  const categoryIndex = Object.keys(menu).indexOf(query.categoria as string);

  const left = categoryIndex === 0 ?
    null :
    Object.keys(menu)[categoryIndex - 1]
  ;
  const right = Object.keys(menu).length === (categoryIndex + 1) ?
    null :
    Object.keys(menu)[categoryIndex + 1]
  ;

  return (
    <ArrowButton>
      <div>
        {left &&
          <Image
            src={'./arrow-left.svg'}
            alt='arrowLeft'
            width={25}
            height={25}
            onClick={() => push(`/menu?categoria=${left}`)}
          />
        }
      </div>
      <div>
        {right &&
          <Image
            src={'./arrow-right.svg'}
            alt='arrowLeft'
            width={25}
            height={25}
            onClick={() => push(`/menu?categoria=${right}`)}
          />
        }        
      </div>
    </ArrowButton>
  )
}

export default Arrow;