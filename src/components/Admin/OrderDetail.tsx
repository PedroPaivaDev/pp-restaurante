import React from 'react';
import styled from 'styled-components';
import timestampToDate from '@/helper/timestampToDate';

const DivOrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface PropsOrderDetail {
  orderId: string;
  userOrder: UserOrder;
}

const OrderDetail = ({orderId, userOrder}:PropsOrderDetail) => {
  return (
    <DivOrderDetail className='bgPaper'>
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
    </DivOrderDetail>
  )
}

export default OrderDetail;