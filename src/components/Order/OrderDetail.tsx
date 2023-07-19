import React from 'react';
import styled from 'styled-components';

import { getData } from '@/services/firebase';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import timestampToDate from '@/helper/timestampToDate';
import verifyPendingOrders from '@/helper/verifyPendingOrders';
import sendOrderByWhatsapp from '@/helper/sendOrderByWhatsapp';

import { contactWhatsapp } from '../Contact';
import Button from '../Forms/Button';
import OrderStatus from './OrderStatus';
import sendMsgToCustomer from '@/helper/sendMsgToCustomer';

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
  const width = useMediaQuery();
  const [menu, setMenu] = React.useState<Menu|null>(null);

  React.useEffect(() => {
    getData('cardapio', setMenu);
  },[])

  return (
    <DivOrderDetail className='bgPaper'>
      {userDB?.userData.admin &&
        <Button
          label='Chamar Cliente pelo WhatsApp'
          onClick={() => sendMsgToCustomer(userOrder)}
        />
      }
      {menu && userDB && verifyPendingOrders(userDB.userOrders) &&
        <Button
          label='Chamar pelo WhatsApp'
          onClick={() => sendOrderByWhatsapp(userOrder, menu.products, width, contactWhatsapp)}
        />
      }
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