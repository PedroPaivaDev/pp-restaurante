/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';

import { auth } from '@/services/firebase';
import useLocalStorage from '@/hooks/useLocalStorage';

const provider = new GoogleAuthProvider();

interface PropsAuthGoogleContext {
  signInGoogle: () => void;
  signOut: () => void;
  isSiged: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const defaultContext: PropsAuthGoogleContext = {
  signInGoogle: () => {},
  signOut: () => {},
  isSiged: false,
  user: null,
  setUser: () => null
}

export const AuthGoogleContext = React.createContext<PropsAuthGoogleContext>(defaultContext)

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [user, setUser] = useLocalStorage<User|null>('@AuthFirebase:user', null);
  const [isSiged, setIsSigned] = React.useState<boolean>(false);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const signOut = () => {
    setUser(null);
  }

  React.useEffect(() => {
    if(user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  },[user])

  return (
    <AuthGoogleContext.Provider value={{
      signInGoogle,
      signOut,
      isSiged,
      user,
      setUser: setUser as React.Dispatch<React.SetStateAction<User|null>>
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}

export default AuthGoogleProvider