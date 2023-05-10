import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { getProducts } from '@/services/firebase';
import useLocalStorage from '@/hooks/useLocalStorage';

import Products from '../components/Products';
import SubNavBar from '@/components/SubNavBar';
import Button from '@/components/Button';

const ButtonDiv = styled.div`
  position: absolute;
  top: 90px;
  width: 100%;
  max-width: 900px;
  .submitButton {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    button {
      background-color: ${props => props.theme.colors.sucess};
    }
  }
`;

const Menu = () => {
  const {query, push} = useRouter();
  const [menu, setMenu] = React.useState<Menu>();
  const [marmita, setMarmita] = useLocalStorage<{[key: string]: string[]}>('marmita', {});
  const [submitMarmita, setSubmitMarmita] = React.useState<boolean>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  function handleClick() {
    push('/menu?categoria=bases');
  }

  function handleSubmit() {
    push('/menu');
  }

  React.useEffect(() => {
    if(Object.keys(marmita).length>2) {
      setSubmitMarmita(true);
    } else {
      setSubmitMarmita(false);
    }
  },[marmita])

  return (
    <div className='page animeleft'>
      {menu && <SubNavBar 
        categories={Object.keys(menu?.products)}
        path={query.categoria as string}
      />}
      {query.categoria && submitMarmita && 
        <ButtonDiv>
          <Button
            label='Concluir Marmita'
            className='submitButton'
            onClick={handleSubmit}
          />
        </ButtonDiv>
      }
      {query.categoria===undefined && menu && !submitMarmita && 
        <div className='wrapper'>
          <h1>{menu.title}</h1>
          <p>{menu.description1}</p>
          <Button label='Montar Marmita' onClick={handleClick}/>
        </div>
      }
      {query.categoria && menu &&
        <Products
          menu={menu?.products as MenuProducts}
          category={`${query.categoria}`}
          marmita={marmita} setMarmita={setMarmita}
        />
      }
    </div>
  )
};

export default Menu;