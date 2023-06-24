import React from 'react';
import { getUsers } from '@/services/firebase';
import OrderDetail from './OrderDetail';
import Grid from '../Grid';

const HistoryOrders = () => {
  const [customers, setCustumers] = React.useState<UsersDB|null>(null);
  const [orders, setOrders] = React.useState<{[key:string]:UserOrder}|null>(null);

  React.useEffect(() => {
    getUsers(setCustumers as React.Dispatch<React.SetStateAction<UsersDB>>);
  },[]);

  React.useEffect(() => {
    let usersOrders:{[key:string]:UserOrder} = {}
    customers && Object.keys(customers).forEach(customer => {
      if(customers[customer].userOrders) {
        Object.keys(customers[customer].userOrders).forEach(orderUUID => {
          usersOrders = {
            ...usersOrders,
            [orderUUID]: customers[customer].userOrders[orderUUID]
          }
        })
      }
    });
    setOrders(usersOrders)
  },[customers])

  return (
    <div className='envelope animeLeft'>
      <h1>Histórico de Pedidos</h1>
      <div className='wrapper'>
        <div className='row'>
          {orders && Object.keys(orders).map(orderId =>
            <Grid key={orderId} xs={12} sm={6} md={6} lg={4}>
              <OrderDetail orderId={orderId} userOrder={orders[orderId]}/>
            </Grid>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryOrders;