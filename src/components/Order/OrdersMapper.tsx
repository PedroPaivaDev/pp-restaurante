import React from 'react';
import styled from 'styled-components';

import sortOrdersByTime from '@/helper/sortOrdersByTime';

import Grid from '../Grid';
import OrderDetail from './OrderDetail';

const DivOrderMapper = styled.div`
  .sequenceButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
`;

interface PropsOrderMapper {
  title: string;
  orders: UserOrders
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrdersMapper = ({title, orders, setModalOrder}:PropsOrderMapper) => {

  return (
    <DivOrderMapper className='envelope animeLeft'>
      <h1>{title}</h1>
      <div className='wrapper'>
        <div className='row'>
          {orders && sortOrdersByTime(orders).map(order =>
            <Grid key={order.uuid} xs={12} sm={6} md={6} lg={4} className='animeLeft'>
              <OrderDetail setModalOrder={setModalOrder} userOrder={order}/>
            </Grid>
          )}
        </div>
      </div>
    </DivOrderMapper>
  )
}

export default OrdersMapper;