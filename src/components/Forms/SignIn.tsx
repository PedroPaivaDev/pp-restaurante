import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import { getUserAuth } from '@/services/firebase';

import Button from './Button';

const DivSignIn = styled.div`
  margin-top: 20px;
  .userData {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    img {
      border: 2px solid ${props => props.theme.colors.primaryColor};
      border-radius: 40px;
      box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
    }
    .userName {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .signInButton {
    justify-content: center;
    color: ${props => props.theme.colors.primaryColor};
  }
`;

const SignIn: React.FC = () => {
  const {signInGoogle, userUid, logout} = React.useContext(AuthGoogleContext);
  const [userAuth, setUserAuth] = React.useState<UserAuth|null>(null);

  React.useEffect(() => {
    userUid && getUserAuth(userUid, setUserAuth);
  },[userUid])

  React.useEffect(() => {
    console.log(userUid,userAuth)
  },[userUid,userAuth])

  return (
    <DivSignIn>
      {(userUid && userAuth)
      ?
        <div className='userData'>
          <div className='userPhoto'>
            {userAuth.userData.photoURL && 
              <Image src={userAuth.userData.photoURL} width={80} height={80} alt="FotoUsuario" />
            }
          </div>
          <div className='userName'>
            <strong>{userAuth.userData.displayName}</strong>
            <Button
              label='Sair'
              onClick={logout}
              className='signInButton'
            />
          </div>
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