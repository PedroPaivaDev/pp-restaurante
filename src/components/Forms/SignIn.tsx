import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import { getUserDB, getUsers } from '@/services/firebase';

import Button from './Button';
import { useRouter } from 'next/router';

const DivSignIn = styled.div`
  margin-top: 20px;
  .userData {
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
    justify-content: center;
    color: ${props => props.theme.colors.primaryColor};
  }
`;

const SignIn: React.FC = () => {
  const {signInGoogle, userAuth, logout} = React.useContext(AuthGoogleContext);
  const [userDB, setUserDB] = React.useState<UserDB|null>(null);
  const {push} = useRouter();

  function redirectToProfile() {
    push('perfil')
  }

  React.useEffect(() => {
    userAuth && getUserDB(userAuth.uid, setUserDB);
  },[userAuth])

  React.useEffect(() => {
    getUsers();
  })

  return (
    <DivSignIn>
      {(userAuth && userDB)
      ?
        <div className='userData'>
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