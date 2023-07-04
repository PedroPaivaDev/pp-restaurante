import React from 'react';
import styled from 'styled-components';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import { changeOrderStatus } from '@/services/firebase';
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
  const {userDB} = React.useContext(AuthGoogleContext);

  const statusOptions = {
    pendente: null,
    preparo: null,
    entrega: null,
    concluido: null,
    cancelado: null
  }

  function handleStatus(target:HTMLSelectElement) {
    changeOrderStatus(userDB?.uid as string, userOrder.uuid, target.value)
  }

  React.useEffect(() => {
    setStatus({[userOrder.status]:null})
  },[userOrder])

  return (
    <DivOrderDetail className='bgPaper'>
      <h2>Pedido: {orderId}</h2>
      {userDB?.userData.admin && <Select
        name='status'
        label={"Status:"}
        options={statusOptions}
        selectedOption={status} setSelectedOption={setStatus}
        admin={handleStatus}
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