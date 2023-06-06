import React from 'react';
import styled from 'styled-components';
// import Image from 'next/image';
// import { AuthGoogleContext } from '@/contexts/authGoogle';

const DivSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .userData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  img {
    border-radius: 50px;
  }
`;

const SignIn: React.FC = () => {
  // const {signInGoogle} = React.useContext(AuthGoogleContext);

  // async function handleSignInGoogle() {
  //   await signInGoogle();
  // }

  return (
    <DivSignIn>
      {/* <div className='userData'>
        {user.photoURL && 
          <Image src={user.photoURL} width={100} height={100} alt="FotoUsuario" />
        }
        <strong>{user.displayName}</strong>
        <small>{user.email}</small>
      </div> */}
      {/* <button style={{color:'black'}} onClick={handleSignInGoogle}>
        Entrar com o Google
      </button> */}
    </DivSignIn>
  );
};

export default SignIn;