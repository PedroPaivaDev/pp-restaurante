import React from 'react';
import styled from 'styled-components';

import sortOrdersByTime from '@/helper/sortOrdersByTime';

import Grid from '../Grid';
import OrderDetail from './OrderDetail';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import { useRouter } from 'next/router';
import InputRadio from '../Forms/InputRadio';

const DivOrderMapper = styled.div`
  .sequenceButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
  .sequencesOptions {
    display: flex;
    gap: 20px;
  }
`;

interface PropsOrderMapper {
  title: string;
  orders: UserOrders
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrdersMapper = ({title, orders, setModalOrder}:PropsOrderMapper) => {
  const {userDB, setUserDBChanged} = React.useContext(AuthGoogleContext);
  const {query} = useRouter();
  const [selectedSequence, setSelectedSequence] = React.useState<OptionsObject|null>({descending:null});

  const sorterSequences:OptionsObject = {
    ascending: null,
    descending: null,
    status: null
  }

  React.useEffect(() => {
    if(query.categoria==='Pedido') {
      const interval = setInterval(() => {
        setUserDBChanged(Date.now());
        console.log('reload')
      },30000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  },[]);

  return (
    <DivOrderMapper className='envelope animeLeft'>
      <h1>{title}</h1>
      {userDB?.userData.admin &&
        <InputRadio options={sorterSequences} name={'sequence'}
          state={selectedSequence} setState={setSelectedSequence}
          className='sequencesOptions'
        />
      }
      <div className='wrapper'>
        <div className='row'>
          {orders && selectedSequence && sortOrdersByTime(orders, Object.keys(selectedSequence)[0]).map(order =>
            <Grid key={order.uuid} xs={12} sm={6} md={6} lg={4} className='animeLeft'>
              <OrderDetail setModalOrder={setModalOrder} userOrder={order}/>
            </Grid>
          )}
        </div>
      </div>
    </DivOrderMapper>
  )
}

export default OrdersMapper;