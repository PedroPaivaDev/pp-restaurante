/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import Cookie from 'js-cookie';

import { auth, getUserDB, setNewUser } from '@/services/firebase';

const provider = new GoogleAuthProvider();

interface PropsAuthGoogleContext {
  signInGoogle: () => void;
  logout: () => void;
  userDB: UserDB|null;
  setUserDBChanged: React.Dispatch<React.SetStateAction<number|null>>
}

const defaultContext: PropsAuthGoogleContext = {
  signInGoogle: () => {},
  logout: () => {},
  userDB: null,
  setUserDBChanged: () => {}
}

export const AuthGoogleContext = React.createContext<PropsAuthGoogleContext>(defaultContext)

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [userAuth, setUserAuth] = React.useState<User|null>(null);
  const [userDB, setUserDB] = React.useState<UserDB|null>(null);
  const [userDBChanged, setUserDBChanged] = React.useState<number|null>(null);

  function setSession(session:string|null) {
    if(session) {
      Cookie.set('FirebaseUserUid', session, {
        expires: 1,
      });
    } else {
      Cookie.remove('FirebaseUserUid');
    }
  }

  function signInGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user)
      isUidAlreadyRegistered(result.user).then((resolve) => {
        if(resolve) {
          setUserAuth(result.user);
          console.log('entrando...')
        } else {
          createUser(result.user);
          console.log('criando...')
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async function isUidAlreadyRegistered(user:User) {
    const creationTime = new Date(user.metadata.creationTime as string).getTime();
    const lastLoginAt = new Date(user.metadata.lastSignInTime as string).getTime();
    const difference = lastLoginAt - creationTime
    const fiveSecondsInMillis = 5000;
    if(difference < fiveSecondsInMillis) {
      console.log('não tem cadastro.')
      return false;
    } else {
      console.log('já tem cadastro.')
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

  React.useEffect(() => {
    if(userAuth) {
      setSession(userAuth.uid)
      getUserDB(userAuth.uid, setUserDB);      
    } else {
      setSession(null)
      setUserDB(null);
    }
  },[userAuth, userDBChanged])

  return (
    <AuthGoogleContext.Provider value={{
      signInGoogle,
      logout,
      userDB,
      setUserDBChanged
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}

export default AuthGoogleProvider