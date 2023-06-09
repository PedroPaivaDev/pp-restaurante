/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth, setNewUser } from '@/services/firebase';

const provider = new GoogleAuthProvider();

interface PropsAuthGoogleContext {
  signInGoogle: () => void;
  logout: () => void;
  userAuth: User | null;
  setUserAuth: React.Dispatch<React.SetStateAction<User | null>>
}

const defaultContext: PropsAuthGoogleContext = {
  signInGoogle: () => {},
  logout: () => {},
  userAuth: null,
  setUserAuth: () => null
}

export const AuthGoogleContext = React.createContext<PropsAuthGoogleContext>(defaultContext)

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [userAuth, setUserAuth] = React.useState<User|null>(null);

  function signInGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user)
      isUidAlreadyRegistered(result.user).then((resolve) => {
        if(resolve) {
          setUserAuth(result.user);
        } else {
          createUser(result.user);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async function isUidAlreadyRegistered(user:User) {
    const currentTimestamp = Date.now();
    const difference = currentTimestamp - new Date(user.metadata.creationTime as string).getTime();
    const fiveSecondsInMillis = 5000;
    if(difference < fiveSecondsInMillis) {
      return false;
    } else {
      return true;
    }
  }

  function createUser(user:User) {
    setNewUser(user);
    setUserAuth(user);
  }

  function logout() {
    signOut(auth);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserAuth(user);
    });
  });

  return (
    <AuthGoogleContext.Provider value={{
      signInGoogle,
      logout,
      userAuth,
      setUserAuth: setUserAuth as React.Dispatch<React.SetStateAction<User|null>>
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}

export default AuthGoogleProvider