import React from 'react';
import { useRouter } from 'next/router';

import verifyPendingOrders from '@/helper/verifyPendingOrders';
import Button from '../Forms/Button';

const OrderPending = ({userOrders, className}:{userOrders:UserOrders, className?:string}) => {
  const {push} = useRouter();
  const [pendingOrders, setPendingOrders] = React.useState<UserOrders|null>(null);

  React.useEffect(() => {
    userOrders && setPendingOrders(verifyPendingOrders(userOrders));
  },[userOrders]);

  if(userOrders && pendingOrders) {
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