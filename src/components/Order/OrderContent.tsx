import React from 'react';
import styled from 'styled-components';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import { getOrderByUuid, getData } from '@/services/firebase';
import getPortions from '@/helper/getPortions';
import timestampToDate from '@/helper/timestampToDate';
import getNameById from '@/helper/getNameById';

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
  userId: string;
  orderUuid: string;
}

const OrderContent = ({userId, orderUuid}:PropsOrderModal) => {
  const {userDB} = React.useContext(AuthGoogleContext);
  const [order, setOrder] = React.useState<UserOrder|null>(null);
  const [menu, setMenu] = React.useState<Menu|null>(null);

  React.useEffect(() => {
    getData<Menu>('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>);
  },[]);

  React.useEffect(() => {
    getOrderByUuid(userId, orderUuid, setOrder as React.Dispatch<React.SetStateAction<UserOrder>>);
  },[userId, orderUuid]);

  if(order && menu) {
    return <DivOrderContent className='bgPaper'>
      <h1>{order.orderFormData.client}</h1>
      <p>Contato: {order.orderFormData.contact}</p>
      <p>Feito em {timestampToDate(order.orderTime)}</p>
      {order.orderFormData.installment ?
        <p>{order.orderFormData.installment} - {order.orderFormData.payment} - <strong>R$ {order.totalPrice.toFixed(2)}</strong></p> :
        <p>{order.orderFormData.payment} - <strong>R$ {order.totalPrice.toFixed(2)}</strong></p>
      }
      {order.orderFormData.delivery &&
        <p className='delivery'>
          <strong>Entregar</strong> na {order.orderFormData.address}.
        </p>
      }
      {userDB && <OrderStatus orderStatus={order.status} />}
      {Object.keys(order.orderMarmitas).map(marmitaId =>
        <div className='marmitas' key={marmitaId}>
          <p><strong>{order.orderMarmitas[marmitaId].size}: </strong>{order.orderMarmitas[marmitaId].id} - R$ {order.orderMarmitas[marmitaId].price.toFixed(2)}</p>
          {getPortions(order.orderMarmitas[marmitaId].portions).map(portion =>
            <p key={portion}>{getNameById(portion,menu.products)}</p>
          )}
        </div>
      )}
    </DivOrderContent>
  } else {
    return <></>
  }
}

export default OrderContent;