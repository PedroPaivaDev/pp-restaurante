/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '@/services/firebase';

const provider = new GoogleAuthProvider();

interface PropsAuthGoogleContext {
  signInGoogle: () => void;
  logout: () => void;
  userUid: string | null;
  setUserUid: React.Dispatch<React.SetStateAction<string | null>>
}

const defaultContext: PropsAuthGoogleContext = {
  signInGoogle: () => {},
  logout: () => {},
  userUid: null,
  setUserUid: () => null
}

export const AuthGoogleContext = React.createContext<PropsAuthGoogleContext>(defaultContext)

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [userUid, setUserUid] = React.useState<string|null>(null);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      setUserUid(result.user.uid);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const logout = () => {
    signOut(auth);
};

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUid(user?.uid);
      } else {
        setUserUid(null);
      }
    });
  });

  return (
    <AuthGoogleContext.Provider value={{
      signInGoogle,
      logout,
      userUid,
      setUserUid: setUserUid as React.Dispatch<React.SetStateAction<string|null>>
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}

export default AuthGoogleProvider