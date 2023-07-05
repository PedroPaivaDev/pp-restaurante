import React from 'react';
import styled from 'styled-components';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import getPortions from '@/helper/getPortions';
import timestampToDate from '@/helper/timestampToDate';

import OrderStatus from './OrderStatus';

const DivOrderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
  gap: 10px;
  height: 100%;
  overflow: auto;
  .delivery {
    text-align: center;
    max-width: 300px;
  }
  .marmitas {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      text-align: center;
    }
  }
`;

interface PropsOrderModal {
  modalOrder: UserOrder;
}

const OrderContent = ({modalOrder}:PropsOrderModal) => {
  const {userDB} = React.useContext(AuthGoogleContext);

  return (
    <DivOrderContent className='bgPaper'>
      <h1>{modalOrder.orderFormData.client}</h1>
      <p>Contato: {modalOrder.orderFormData.contact}</p>
      <p>Feito em {timestampToDate(modalOrder.orderTime)}</p>
      {modalOrder.orderFormData.installment ?
        <p>{modalOrder.orderFormData.installment} - {modalOrder.orderFormData.payment} - <strong>R$ {modalOrder.totalPrice.toFixed(2)}</strong></p> :
        <p>{modalOrder.orderFormData.payment} - <strong>R$ {modalOrder.totalPrice.toFixed(2)}</strong></p>
      }
      {modalOrder.orderFormData.delivery &&
        <p className='delivery'>
          <strong>Entregar</strong> na {modalOrder.orderFormData.address}.
        </p>
      }
      {userDB && <OrderStatus
        orderStatus={modalOrder.status}
        admin={userDB.userData.admin ?? false}
        userUid={userDB.uid}
        orderUuid={modalOrder.uuid}
      />}
      {Object.keys(modalOrder.orderMarmitas).map(marmitaId =>
        <div className='marmitas' key={marmitaId}>
          <p><strong>{modalOrder.orderMarmitas[marmitaId].size}: </strong>{modalOrder.orderMarmitas[marmitaId].id} - R$ {modalOrder.orderMarmitas[marmitaId].price.toFixed(2)}</p>
          {getPortions(modalOrder.orderMarmitas[marmitaId].portions).map(portion =>
            <p key={portion}>{portion}</p>
          )}
        </div>
      )}
    </DivOrderContent>
  )
}

export default OrderContent;