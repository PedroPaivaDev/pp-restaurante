import React from 'react';
import { useRouter } from 'next/router';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import getOrdersOfTheDay from '@/helper/getOrdersOfTheDay';

import SignIn from '@/components/Forms/SignIn';
import SubNavBar from '@/components/SubNavBar';
import ProfileData from '@/components/ProfileData';
import OrdersMapper from '@/components/Order/OrdersMapper';
import OrderModal from '@/components/Order/OrderModal';

const Perfil = () => {
  const {query} = useRouter();
  const {userAuth, userDB, setUserDBChanged} = React.useContext(AuthGoogleContext);
  const [modalOrder, setModalOrder] = React.useState<UserOrder|null>(null);

  return (
    <div className='page animeLeft'>
      {modalOrder && 
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
        />
      }
      {userAuth && userDB ?
        <>
          <SubNavBar
            categories={["Pedido","Historico","Dados"]}
            path={"perfil"}
            endpoint={query.categoria as string}
          />
          <div className='container'>
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
            {query.categoria==='Dados' &&
              <ProfileData userDB={userDB} setUserDBChanged={setUserDBChanged}/>
            }
          </div>
        </> :
        <>
          <p style={{marginTop:'25px'}}>Faça login com a sua conta do Google, para completar o seu cadastro e prosseguir para a página de Entrega</p>
          <SignIn />
        </>
      }
    </div>
  )
}

export default Perfil;