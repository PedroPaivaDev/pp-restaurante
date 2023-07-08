import React from 'react';
import { useRouter } from 'next/router';

import verifyPendingOrders from '@/helper/verifyPendingOrders';
import Button from '../Forms/Button';

const OrderPending = ({userDB, className}:{userDB:UserDB, className?:string}) => {
  const {push} = useRouter();
  const [pendingOrders, setPendingOrders] = React.useState<UserOrders|null>(null);

  React.useEffect(() => {
    userDB && setPendingOrders(verifyPendingOrders(userDB.userOrders));
  },[userDB]);

  if(userDB?.userOrders && pendingOrders) {
    return (
      <div className={className}>
        <p style={{margin: '10px'}}>Você já fez {Object.keys(pendingOrders).length} pedido hoje.</p>
        <Button label='Acompanhar Pedido' onClick={() => push('perfil?categoria=Pedido')}/>
      </div>
    )
  } else {
    return <></>
  }
}

export default OrderPending;