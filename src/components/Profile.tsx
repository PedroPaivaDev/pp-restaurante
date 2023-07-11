import React from 'react';
import { useRouter } from 'next/router';

import getOrdersOfTheDay from '@/helper/getOrdersOfTheDay';

import OrdersMapper from './Order/OrdersMapper';
import SubNavBar from './SubNavBar';
import ProfileData from './ProfileData';
import ProfileForm from './Forms/ProfileForm';

interface PropsProfile {
  userDB: UserDB;
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder | null>>;
  setUserDBChanged: React.Dispatch<React.SetStateAction<number | null>>;
  path: string;
}

const Profile = ({userDB, setModalOrder, setUserDBChanged, path}:PropsProfile) => {  
  const {query} = useRouter();

  return (
    <>
      <SubNavBar
        categories={["Pedido","Historico","Dados"]}
        path={path}
        endpoint={query.categoria as string}
      />
      <div className={path==='admin' ? 'envelope' : 'container'}>
        {query.categoria===undefined && 
          <div className='wrapper'>
            <h1>Página do perfil do Cliente</h1>
            <p>Selecione a categoria <strong>Pedido</strong>, para acompanhar um pedido feito recentemente.</p>
            <p>Selecione a categoria <strong>Histórico</strong>, para visualizar seus pedidos anteriores.</p>
            <p>Selecione a categoria <strong>Dados</strong>, para visualizar ou editar seus dados de contato e endereço.</p>
          </div>
        }
        {query.categoria==='Pedido' &&
          <OrdersMapper
            title={'Pedidos do Dia'}
            orders={userDB.userOrders? getOrdersOfTheDay(userDB.userOrders): {}}
            setModalOrder={setModalOrder}
          />
        }
        {query.categoria==='Historico' &&
          <OrdersMapper
            title={'Histórico de Pedidos'}
            orders={userDB.userOrders}
            setModalOrder={setModalOrder}
          />
        }
        {query.categoria==='Dados' && setUserDBChanged &&
          <div className='envelope animeLeft'>
            <ProfileData userDB={userDB}/>
            <ProfileForm userDB={userDB} setUserDBChanged={setUserDBChanged}/>
          </div>
        }
      </div>
    </>
  )
}

export default Profile;