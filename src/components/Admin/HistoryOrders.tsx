import React from 'react';
import styled from 'styled-components';

import { getUsers } from '@/services/firebase';
import getOrdersFromUsers from '@/helper/getOrdersFromUsers';
import sortUuids from '@/helper/sortUuids';

import Grid from '../Grid';
import OrderDetail from './OrderDetail';
import Button from '../Forms/Button';

const DivHistoryOrders = styled.div`
  .sequenceButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
`

interface PropsHistoryOrders {
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const HistoryOrders = ({setModalOrder}:PropsHistoryOrders) => {
  const [customers, setCustumers] = React.useState<UsersDB|null>(null);
  const [orders, setOrders] = React.useState<{[key:string]:UserOrder}|null>(null);
  const [ordersSequence, setOrdersSequence] = React.useState<'ascending'|'descending'>('descending');

  React.useEffect(() => {
    getUsers(setCustumers as React.Dispatch<React.SetStateAction<UsersDB>>);
  },[]);

  React.useEffect(() => {
    customers && setOrders(getOrdersFromUsers(customers));
  },[customers]);

  return (
    <DivHistoryOrders className='envelope animeLeft'>
      <h1>Histórico de Pedidos</h1>
      <div className='sequenceButtons'>
        <p>Ordenar por:</p>
        <Button
          label='Último Pedido'
          onClick={() => setOrdersSequence('descending')}
          className='sequenceButton'
        />
        <Button
          label='Primeiro Pedido'
          onClick={() => setOrdersSequence('ascending')}
          className='sequenceButton'
        />
      </div>
      <div className='wrapper'>
        <div className='row'>
          {orders && sortUuids(Object.keys(orders),ordersSequence).map(orderId =>
            <Grid key={orderId} xs={12} sm={6} md={6} lg={4} className='animeLeft'>
              <OrderDetail setModalOrder={setModalOrder} orderId={orderId} userOrder={orders[orderId]}/>
            </Grid>
          )}
        </div>
      </div>
    </DivHistoryOrders>
  )
}

export default HistoryOrders;