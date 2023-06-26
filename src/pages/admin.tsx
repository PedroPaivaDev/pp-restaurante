import React from 'react';
import { useRouter } from 'next/router';

import withAdmin from '@/utils/withAdmin';
import SubNavBar from '@/components/SubNavBar';
import DailyMenu from '@/components/Admin/DailyMenu';
import HistoryOrders from '@/components/Admin/HistoryOrders';
import CustomersDB from '@/components/Admin/CustomersDB';
import CreateProduct from '@/components/Admin/CreateProduct';
import EditProduct from '@/components/Admin/EditProduct';
import DailyOrders from '@/components/Admin/DailyOrders';
import OrderModal from '@/components/Admin/OrderModal';

const Admin = () => {
  const {query} = useRouter();
  const [modalOrder, setModalOrder] = React.useState<UserOrder|null>(null);

  return (
    <div className='page animeLeft'>
      {modalOrder && 
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
        />
      }
      <SubNavBar
        categories={["Cardapio", "Pedidos", "Historico", "Clientes", "Cadastrar", "Editar"]}
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
        {query.categoria==='Pedidos' && <DailyOrders setModalOrder={setModalOrder}/>}
        {query.categoria==='Historico' && <HistoryOrders setModalOrder={setModalOrder}/>}
        {query.categoria==='Clientes' && <CustomersDB/>}
        {query.categoria==='Cadastrar' && <CreateProduct/>}
        {query.categoria==='Editar' && <EditProduct/>}
      </div>
    </div>
  )
}

export default withAdmin(Admin);