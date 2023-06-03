import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/services/firebase';

const SignIn: React.FC = () => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <button style={{color:'black'}} onClick={handleGoogleSignIn}>
      Entrar com o Google
    </button>
  );
};

export default SignIn;
