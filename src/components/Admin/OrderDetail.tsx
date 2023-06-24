import React from 'react';
import styled from 'styled-components';

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
      <strong>{userOrder.orderFormData.client} - {userOrder.orderFormData.contact}</strong>
      <p>{userOrder.orderFormData.payment}</p>
      {userOrder.orderFormData.installment && <p>{userOrder.orderFormData.installment}</p>}
      {userOrder.orderFormData.delivery &&
        <p>
          Entregar na {userOrder.orderFormData.street}, {userOrder.orderFormData.number}, Bairro {userOrder.orderFormData.neighborhood}. Referência: {userOrder.orderFormData.reference}.
        </p>
      }
      <h3>R$ {userOrder.totalPrice.toFixed(2)}</h3>
    </DivOrderDetail>
  )
}

export default OrderDetail;