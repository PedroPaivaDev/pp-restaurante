import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import Button from './Button';
import { useRouter } from 'next/router';
import OrderPending from '../Order/OrderPending';

const DivSignIn = styled.div`
  margin-top: 20px;
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
  .signInButton {
    color: ${props => props.theme.colors.primaryColor};
  }
  .admButton button {
    background-color: ${props => props.theme.colors.sucess};
  }
`;

const SignIn: React.FC = () => {
  const {signInGoogle, userDB, logout } = React.useContext(AuthGoogleContext);
  const {push} = useRouter();

  function redirectToProfile() {
    push('perfil?categoria=Dados')
  }

  return (
    <DivSignIn>
      {userDB
      ?
        <div className='userData'>
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
          <OrderPending userDB={userDB}/>
        </div>
      :
        <Button
          label='Login com a conta do Google'
          onClick={signInGoogle}
          className='signInButton'
        />
      }
    </DivSignIn>
  );
};

export default SignIn;