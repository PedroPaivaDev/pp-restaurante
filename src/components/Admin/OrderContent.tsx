import timestampToDate from '@/helper/timestampToDate';
import React from 'react';
import styled from 'styled-components';

const DivOrderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface PropsOrderModal {
  modalOrder: UserOrder;
}

const OrderContent = ({modalOrder}:PropsOrderModal) => {
  return (
    <DivOrderContent className='bgPaper'>
      <h1>{modalOrder.orderFormData.client}</h1>
      <p>Contato: {modalOrder.orderFormData.contact}</p>
      <p>Feito em {timestampToDate(modalOrder.orderTime)}</p>
      {modalOrder.orderFormData.installment ?
        <p>{modalOrder.orderFormData.installment} - {modalOrder.orderFormData.payment} - R$ {modalOrder.totalPrice.toFixed(2)}</p> :
        <p>{modalOrder.orderFormData.payment} - R$ {modalOrder.totalPrice.toFixed(2)}</p>
      }
      {modalOrder.orderFormData.delivery &&
        <p>
          <strong>Entregar</strong> na {modalOrder.orderFormData.address}.
        </p>
      }
    </DivOrderContent>
  )
}

export default OrderContent;