import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { getData } from '@/services/firebase';
import { MarmitaContext } from '@/contexts/MarmitaContext';
import getPortions from '@/helper/getPortions';

import Products from '../components/Products';
import SubNavBar from '@/components/SubNavBar';
import Button from '@/components/Forms/Button';
import Marmita from '@/components/Marmita';
import InputRadio from '@/components/Forms/InputRadio';

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

const ButtonDivFinish = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .finishButton {
    position: relative;
    margin-top: 20px;
    h6 {
    text-align: center;
    }
  }
`;

const SizeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  .inputsOptions {
    display: flex;
    gap: 20px;
  }
`;

const Menu = () => {
  const {query, push} = useRouter();
  const [menu, setMenu] = React.useState<Menu|null>(null);
  const {marmitaStorage, setMarmitaStorage, bagStorage, setBagStorage} = React.useContext(MarmitaContext);
  const [marmitaPortions, setMarmitaPortions] = React.useState<string[]>();
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Concluir Marmita',
    status: null,
    msg: null
  });
  const [size, setSize] = React.useState<OptionsObject|null>(null);

  function finishMarmita() {
    if(
      marmitaStorage.portions &&
      getPortions(marmitaStorage.portions).length > 2 &&
      size
    ) {
      setBagStorage({
        ...bagStorage,
        [Date.now()]: {
          portions: marmitaStorage.portions,
          size: Object.keys(size as object)[0],
          id: Date.now(),
        }
      });
      setMarmitaStorage({});
      setMarmitaPortions([]);
      push('/entregar');
    } else if(!size) {
      setStatusSubmit({
        label: 'Concluir Marmita',
        status: 'error',
        msg: 'Escolha uma opção de tamanho'
      })
      return;
    } else {
      setStatusSubmit({
        label: 'Concluir Marmita',
        status: 'error',
        msg: 'Escolha pelo menos 3 ingredientes'
      })
      return;
    }
  }

  React.useEffect(() => {
    getData<Menu|null>('cardapio', setMenu);
  },[]);

  React.useEffect(() => {
    if(marmitaStorage.portions) {
      const marmitaStoragePortions = marmitaStorage.portions;
      let portionsArray:string[] = [];
      Object.keys(marmitaStoragePortions).forEach(category =>
        marmitaStoragePortions[category].forEach((portion:string) =>
          portionsArray = [
            ...portionsArray,
            portion
          ]
        )
      );
      setMarmitaPortions(portionsArray);
    }
  },[marmitaStorage]);

  return (
    <div className='page animeleft'>
      {menu && <SubNavBar 
        categories={Object.keys(menu?.products)}
        path={"menu"}
        endpoint={query.categoria as string}
      />}
      {query.categoria && (marmitaPortions && marmitaPortions?.length>2) && 
        <ButtonDiv>
          <Button
            label='Finalizar Marmita'
            className='submitButton'
            onClick={() => push('/menu')}
            glow
          />
        </ButtonDiv>
      }
      {query.categoria===undefined && menu && !marmitaPortions?.length && 
        <div className='wrapper'>
          <h1>{menu.title}</h1>
          <p>{menu.description}</p>
          <Button
            label='Começar a Montar'
            onClick={() => push('/menu?categoria=bases')}
          />
        </div>
      }
      {query.categoria===undefined && (marmitaPortions && marmitaPortions.length>=1) &&
        <div className='container'>
          <div className="envelope animeLeft">
            <div className="wrapper">
              <SizeOptions>
                <h2>Escolha um tamanho:</h2>
                {menu && <InputRadio options={menu.prices.week} name={'marmitaSize'}
                  state={size} setState={setSize}
                  className='inputsOptions'
                />}
              </SizeOptions>
              <ButtonDivFinish>
                <Button
                  label={statusSubmit.label}
                  onClick={finishMarmita}
                  statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
                  className='finishButton'
                />
              </ButtonDivFinish>
              <h3>ou</h3>
              <Button
                label='Continuar Montando'
                onClick={() => push('/menu?categoria=bases')}
              />
              <Marmita
                menu={menu as Menu}
                marmita={marmitaStorage}
                setMarmita={setMarmitaStorage}
              />
            </div>
          </div>
        </div>
      }
      {query.categoria && menu &&
        <Products
          menu={menu?.products as MenuProducts}
          category={`${query.categoria}`}
          marmita={marmitaStorage}
          setMarmita={setMarmitaStorage}
        />
      }
    </div>
  )
};

export default Menu;