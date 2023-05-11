import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { getProducts } from '@/services/firebase';
import useLocalStorage from '@/hooks/useLocalStorage';

import Products from '../components/Products';
import SubNavBar from '@/components/SubNavBar';
import Button from '@/components/Button';
import Marmita from '@/components/Marmita';

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
  const [marmita, setMarmita] = useLocalStorage<Marmita>('marmita', {});
  const [submitMarmita, setSubmitMarmita] = React.useState<string[]>();

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  React.useEffect(() => {
    if(marmita) {
      let portionsArray:string[] = [];
      Object.keys(marmita).forEach(category =>
        marmita[category].forEach(portion =>
          portionsArray = [
            ...portionsArray,
            portion
          ]
        )
      );
      setSubmitMarmita(portionsArray);
    }
  },[marmita]);

  return (
    <div className='page animeleft'>
      {menu && <SubNavBar 
        categories={Object.keys(menu?.products)}
        path={query.categoria as string}
      />}
      {query.categoria && ((submitMarmita?.length as number) > 2) && 
        <ButtonDiv>
          <Button
            label='Concluir Marmita'
            className='submitButton'
            onClick={() => push('/menu')}
          />
        </ButtonDiv>
      }
      {query.categoria===undefined && menu && !submitMarmita?.length && 
        <div className='wrapper'>
          <h1>{menu.title}</h1>
          <p>{menu.description1}</p>
          <Button
            label='Montar Marmita'
            onClick={() => push('/menu?categoria=bases')}
          />
        </div>
      }
      {query.categoria===undefined && submitMarmita?.length &&
        <div className='container'>
          <div className="envelope animeLeft">
            <div className="wrapper">
              <Button
                label='Concluir Marmita'
                onClick={() => push('/entrega')}
              />
              <h1>Ou continue montando sua marmita</h1>
              <Marmita menu={menu as Menu} marmita={marmita} setMarmita={setMarmita} />
            </div>
          </div>
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