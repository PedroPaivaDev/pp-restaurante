import React from 'react';
import styled from 'styled-components';

import { changeOrderStatus } from '@/services/firebase';
import getOption from '@/helper/getOption';

import Select from '../Forms/Select';

const DivOrderStatus = styled.div<BgProps>`
  .statusText {
    margin: 10px;
    text-align: center;
    border-radius: 20px;
    padding: 0 10px;
    color: ${props => props.theme.colors.primaryColor};
    background: ${props => props.bgImage};
    box-shadow: 0 0 10px 10px ${props => props.bgImage};
    
  }
  .statusSelect {
    .select {
      background: ${props => props.bgImage};
      width: 110px;
      text-transform: uppercase;
      option {
        background-color: ${props => props.theme.colors.tertiaryColor};
      }
    }
  }
`;

interface PropsOrderStatus {
  orderStatus: OrderStatus;
  admin: boolean;
  userUid: string;
  orderUuid: string
}

const OrderStatus = ({orderStatus, admin, userUid, orderUuid}:PropsOrderStatus) => {
  const [status, setStatus] = React.useState<OptionsObject|null>(null);
  const statusOptions = {
    pendente: '#fcdf6a',
    preparo: '#FACA08',
    entrega: '#CC9132',
    concluido: '#1AB912',
    cancelado: '#f31'
  }

  function handleStatus(target:HTMLSelectElement) {
    changeOrderStatus(userUid, orderUuid, target.value)
  }

  React.useEffect(() => {
    setStatus({[orderStatus]:statusOptions[orderStatus]})
    // eslint-disable-next-line
  },[orderStatus])

  if(status) {
    return <DivOrderStatus bgImage={status[getOption(status)] as string}>
      {admin ?
        <Select
          name='status'
          label={"Status:"}
          options={statusOptions}
          selectedOption={status} setSelectedOption={setStatus}
          admin={handleStatus}
          className='statusSelect'
        /> :
        <h3 className='statusText'>{getOption(status).toUpperCase()}</h3>
      }      
    </DivOrderStatus>
  } else {
    return <></>
  }
}

export default OrderStatus;