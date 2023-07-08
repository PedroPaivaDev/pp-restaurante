import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import Button from './Button';
import { useRouter } from 'next/router';
import OrderPending from '../Order/OrderPending';
import Loading from '../Loading';

const DivSignIn = styled.div`
  margin-top: 20px;
  .signInMsg {
    max-width: 500px;
    margin-bottom: 10px;
  }
  .userContent {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    img {
      cursor: pointer;
      border: 2px solid ${props => props.theme.colors.primaryColor};
      border-radius: 40px;
      box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
      transition: 0.3s;
    }
    img:hover {
      box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.tertiaryColor};
    }
    .userName {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .admButton button {
    background-color: ${props => props.theme.colors.sucess};
  }
`;

const SignIn: React.FC = () => {
  const {signInGoogle, userDB, logout, userAuth } = React.useContext(AuthGoogleContext);
  const {push} = useRouter();

  function redirectToProfile() {
    push('perfil?categoria=Dados')
  }

  if(userAuth===false) {
    return <Loading/>
  } else if(userAuth===null) {
    return <DivSignIn>      
      <p className='signInMsg'>Faça login com a sua conta do Google, para completar o seu cadastro e prosseguir para a página de Entrega</p>
      <Button
        label='Login com a conta do Google'
        onClick={signInGoogle}
        className='signInButton'
      />
    </DivSignIn>
  } else {
    return (
      <DivSignIn>
        {userDB && <div className='userData'>
          <div className='userContent'>
            <div className='userPhoto' onClick={redirectToProfile}>
              {userDB.userData.photoURL && 
                <Image src={userDB.userData.photoURL} width={80} height={80} alt="FotoUsuario" />
              }
            </div>
            <div className='userName'>
              <strong>{userDB.userData.displayName}</strong>
              <Button
                label='Sair'
                onClick={logout}
                className='signInButton'
              />
            </div>
            {userDB?.userData.admin &&
              <Button
                label='Administração'
                onClick={() => push('admin')}
                className='admButton'
              />
            }
          </div>
          {userDB.userOrders && <OrderPending userOrders={userDB.userOrders}/>}
        </div>}
      </DivSignIn>
    );
  }
}


export default SignIn;