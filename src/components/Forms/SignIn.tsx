import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
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
  const {signInGoogle, user, signOut, isSiged} = React.useContext(AuthGoogleContext);

  return (
    <DivSignIn>
      {(isSiged && user)
      ?
        <div className='userData'>
          <div className='userPhoto'>
            {user.photoURL && 
              <Image src={user.photoURL} width={80} height={80} alt="FotoUsuario" />
            }
          </div>
          <div className='userName'>
            <strong>{user.displayName}</strong>
            <Button
              label='Sair'
              onClick={signOut}
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