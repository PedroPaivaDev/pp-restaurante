import React from 'react';
import styled from 'styled-components';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import timestampToDate from '@/helper/timestampToDate';

import OrderStatus from './OrderStatus';

const DivOrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .content {
    color: ${props => props.theme.colors.secondaryColor};
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: ${props => props.theme.colors.primaryColor};
    }
  }
`;

interface PropsOrderDetail {
  userOrder: UserOrder;
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrderDetail = ({userOrder, setModalOrder}:PropsOrderDetail) => {
  const {userDB} = React.useContext(AuthGoogleContext);

  return (
    <DivOrderDetail className='bgPaper'>
      <h2>Pedido: {userOrder.uuid}</h2>
      {userDB && <OrderStatus
        orderStatus={userOrder.status}
        admin={userDB.userData.admin ?? false}
        userUid={userOrder.orderFormData.uid}
        orderUuid={userOrder.uuid}
      />}
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
      <span className='content' onClick={() => setModalOrder(userOrder)}>
        MAIS DETALHES
      </span>
    </DivOrderDetail>
  )
}

export default OrderDetail;