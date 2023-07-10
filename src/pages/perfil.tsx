import React from 'react';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import SignIn from '@/components/Forms/SignIn';
import OrderModal from '@/components/Order/OrderModal';
import Profile from '@/components/Profile';

const Perfil = () => {
  const {userAuth, userDB, setUserDBChanged} = React.useContext(AuthGoogleContext);
  const [modalOrder, setModalOrder] = React.useState<UserOrder|null>(null);

  return (
    <div className='page animeLeft'>
      {modalOrder && 
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
        />
      }
      {userAuth && userDB ?
        <Profile
          userDB={userDB}
          setModalOrder={setModalOrder}
          setUserDBChanged={setUserDBChanged}
          path='perfil'
        /> :
        <SignIn />
      }
    </div>
  )
}

export default Perfil;