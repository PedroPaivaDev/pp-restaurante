import React from 'react';
import styled from 'styled-components';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import timestampToDate from '@/helper/timestampToDate';

import Select from '../Forms/Select';

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
  orderId: string;
  userOrder: UserOrder;
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrderDetail = ({orderId, userOrder, setModalOrder}:PropsOrderDetail) => {
  const [status, setStatus] = React.useState<OptionsObject|null>(null);
  const {userDB} = React.useContext(AuthGoogleContext)

  function handleClick() {
    setModalOrder(userOrder);
  }

  const statusOptions = {
    pendente: null,
    preparo: null,
    entrega: null,
    concluido: null,
    cancelado: null
  }

  return (
    <DivOrderDetail className='bgPaper'>
      <h2>Pedido: {orderId}</h2>
      <Select
        name='status'
        label={"Status:"}
        options={statusOptions}
        selectedOption={status} setSelectedOption={setStatus}
        admin={userDB?.userData.admin}
      />
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
      <span className='content' onClick={handleClick}>MAIS DETALHES</span>
    </DivOrderDetail>
  )
}

export default OrderDetail;