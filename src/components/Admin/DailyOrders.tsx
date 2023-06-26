import getOrdersFromUsers from '@/helper/getOrdersFromUsers';
import { getUsers } from '@/services/firebase';
import React from 'react';
import Grid from '../Grid';
import OrderDetail from './OrderDetail';
import getDiffTimestamp from '@/helper/getDiffTimestamp';

interface PropsHistoryOrders {
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const DailyOrders = ({setModalOrder}:PropsHistoryOrders) => {
  const [customers, setCustumers] = React.useState<UsersDB|null>(null);
  const [orders, setOrders] = React.useState<{[key:string]:UserOrder}|null>(null);

  React.useEffect(() => {
    getUsers(setCustumers as React.Dispatch<React.SetStateAction<UsersDB>>);
  },[]);

  React.useEffect(() => {
    customers && setOrders(getOrdersFromUsers(customers));
  },[customers]);

  return (
    <div className='envelope animeLeft'>
      <h1>Pedidos do Dia</h1>
      <div className='wrapper'>
        <div className='row'>
          {orders && Object.keys(orders).filter(orderId => getDiffTimestamp(orders[orderId].orderTime, 20)).map(orderId =>
            <Grid key={orderId} xs={12} sm={6} md={6} lg={4}>
              <OrderDetail setModalOrder={setModalOrder} orderId={orderId} userOrder={orders[orderId]}/>
            </Grid>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyOrders;