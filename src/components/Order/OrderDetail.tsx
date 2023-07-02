import React from 'react';
import styled from 'styled-components';

import timestampToDate from '@/helper/timestampToDate';
import OrderStatus from './OrderStatus';

const DivOrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface PropsOrderDetail {
  orderId: string;
  userOrder: UserOrder;
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrderDetail = ({orderId, userOrder, setModalOrder}:PropsOrderDetail) => {

  function handleClick() {
    setModalOrder(userOrder);
  }

  return (
    <DivOrderDetail className='bgPaper' onClick={handleClick}>
      <h2>Pedido: {orderId}</h2>
      <p>Feito em {timestampToDate(userOrder.orderTime)}</p>
      <p><strong>{userOrder.orderFormData.client}</strong> - {userOrder.orderFormData.contact}</p>
      {userOrder.orderFormData.installment ?
        <p>{userOrder.orderFormData.installment} - {userOrder.orderFormData.payment} - R$ {userOrder.totalPrice.toFixed(2)}</p> :
        <p>{userOrder.orderFormData.payment} - R$ {userOrder.totalPrice.toFixed(2)}</p>
      }
      {userOrder.orderFormData.delivery &&
        <p>
          <strong>Entregar</strong> na {userOrder.orderFormData.address}.
        </p>
      }
      <OrderStatus orderStatus={userOrder.status}/>
    </DivOrderDetail>
  )
}

export default OrderDetail;