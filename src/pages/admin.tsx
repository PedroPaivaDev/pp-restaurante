import React from 'react';
import { useRouter } from 'next/router';

import withAdmin from '@/utils/withAdmin';
import { getData } from '@/services/firebase';
import getOrdersFromUsers from '@/helper/getOrdersFromUsers';
import getOrdersOfTheDay from '@/helper/getOrdersOfTheDay';

import SubNavBar from '@/components/SubNavBar';
import DailyMenu from '@/components/Admin/DailyMenu';
import CustomersDB from '@/components/Admin/CustomersDB';
import CreateProduct from '@/components/Admin/CreateProduct';
import EditProduct from '@/components/Admin/EditProduct';
import OrdersMapper from '@/components/Order/OrdersMapper';
import OrderModal from '@/components/Order/OrderModal';
import Profile from '@/components/Profile';

const Admin = () => {
  const {query} = useRouter();
  const [modalOrder, setModalOrder] = React.useState<UserOrder|null>(null);
  const [userCustomer, setUserCustomer] = React.useState<UserDB|null>(null);
  const [customers, setCustumers] = React.useState<UsersDB|null>(null);
  const [timeUpdate, setTimeUpdate] = React.useState<number | null>(null);

  React.useEffect(() => {
    getData<UsersDB|null>('usuarios', setCustumers);
    const interval = setInterval(() => {
      getData<UsersDB|null>('usuarios', setCustumers);
      console.log('Admin Reload')
    },30000);
    return () => clearInterval(interval)
  },[])

  React.useEffect(() => {
    userCustomer && console.log(`Dados do usuário ${userCustomer.uid}`);
    // eslint-disable-next-line
  },[timeUpdate])

  return (
    <div className='page animeLeft'>
      {modalOrder &&
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
        />
      }
      <SubNavBar
        categories={["Cardapio", "Pedidos", "Historicos", "Clientes", "Cadastrar", "Editar"]}
        path={"admin"}
        endpoint={query.categoria as string}
      />
      <div className='container'>
        {query.categoria===undefined && 
          <div className='wrapper'>
            <h1>Página da Administração do Restaurante</h1>
            <p>Selecione uma das categorias acima</p>
          </div>
        }
        {query.categoria==='Cardapio' && <DailyMenu/>}
        {query.categoria==='Pedidos' && customers &&
          <OrdersMapper
            title={'Pedidos do Dia'}
            orders={getOrdersOfTheDay(getOrdersFromUsers(customers))}
            setModalOrder={setModalOrder}
          />
        }
        {query.categoria==='Historicos' && customers &&
          <OrdersMapper
            title={'Histórico de Pedidos'}
            orders={getOrdersFromUsers(customers)}
            setModalOrder={setModalOrder}
          />
        }
        {query.categoria==='Clientes' && <CustomersDB setUserCustomer={setUserCustomer}/>}
        {query.categoria==='Cadastrar' && <CreateProduct/>}
        {query.categoria==='Editar' && <EditProduct/>}
        {userCustomer &&
          <Profile
            userDB={userCustomer}
            setModalOrder={setModalOrder}
            path={'admin'}
            setUserDBChanged={setTimeUpdate}
          />
        }
      </div>
    </div>
  )
}

export default withAdmin(Admin);