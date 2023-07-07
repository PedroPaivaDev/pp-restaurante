import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import { MarmitaContext } from '@/contexts/MarmitaContext';
import { changeOrderStatus, getData } from '@/services/firebase';
import getPortions from '@/helper/getPortions';
import timestampToDate from '@/helper/timestampToDate';
import getNameById from '@/helper/getNameById';

import OrderStatus from './OrderStatus';
import Button from '../Forms/Button';

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
  .orderAgain {
    margin-top: 10px;
  }
  .buttonCancelOrder {
    button {
      background-color: ${props => props.theme.colors.error};
    }
  }
`;

interface PropsOrderContent {
  userId: string;
  orderUuid: string;
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrderContent = ({userId, orderUuid, setModalOrder}:PropsOrderContent) => {
  const { push, query } = useRouter();
  const {userDB, setUserDBChanged} = React.useContext(AuthGoogleContext);
  const {setBagStorage} = React.useContext(MarmitaContext);
  const [order, setOrder] = React.useState<UserOrder|null>(null);
  const [menu, setMenu] = React.useState<Menu|null>(null);

  function cancelOrder() {
    if(confirm("Tem certeza que você deseja cancelar este pedido?")) {
      changeOrderStatus(userId, orderUuid, 'cancelado');
      setUserDBChanged(Date.now());
      setModalOrder(null);
    } else {
      return
    }
  }

  function orderAgain() {
    setBagStorage(order?.orderMarmitas as Bag);
    push('entregar');
  }

  React.useEffect(() => {
    getData<Menu|null>('cardapio', setMenu);
  },[]);

  React.useEffect(() => {
    getData<UserOrder|null>(`usuarios/${userId}/userOrders/${orderUuid}`, setOrder);
  },[userId, orderUuid]);

  if(order && menu) {
    return <DivOrderContent className='bgPaper'>
      <p>{order.uuid}</p>
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
      {query.categoria==='Pedido' && !(order.status==='cancelado' || order.status==='concluido' || order.status==='entrega') &&
        <Button className='buttonCancelOrder' label='Cancelar Pedido' onClick={cancelOrder}/>
      }
      {Object.keys(order.orderMarmitas).map(marmitaId =>
        <div className='marmitas' key={marmitaId}>
          <p><strong>{order.orderMarmitas[marmitaId].size}: </strong>{order.orderMarmitas[marmitaId].id} - R$ {order.orderMarmitas[marmitaId].price.toFixed(2)}</p>
          {getPortions(order.orderMarmitas[marmitaId].portions).map(portion =>
            <p key={portion}>{getNameById(portion,menu.products)}</p>
          )}
        </div>
      )}
      <p className='orderAgain'>Clique no botão abaixo, caso queira fazer este mesmo pedido novamente:</p>
      <Button label='Pedir Novamente' onClick={orderAgain}/>
    </DivOrderContent>
  } else {
    return <></>
  }
}

export default OrderContent;