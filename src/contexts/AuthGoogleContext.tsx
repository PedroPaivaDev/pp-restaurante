/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth, changeUserData, getData, setNewUser } from '@/services/firebase';

const provider = new GoogleAuthProvider();

interface PropsAuthGoogleContext {
  userAuth: User|null|false;
  signInGoogle: () => void;
  logout: () => void;
  userDB: UserDB|null;
  setUserDBChanged: React.Dispatch<React.SetStateAction<number|null>>
}

const defaultContext: PropsAuthGoogleContext = {
  userAuth: null,
  signInGoogle: () => {},
  logout: () => {},
  userDB: null,
  setUserDBChanged: () => {}
}

export const AuthGoogleContext = React.createContext<PropsAuthGoogleContext>(defaultContext)

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [userAuth, setUserAuth] = React.useState<User|null|false>(false);
  const [userDB, setUserDB] = React.useState<UserDB|null>(null);
  const [userDBChanged, setUserDBChanged] = React.useState<number|null>(null);

  function signInGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      isUidAlreadyRegistered(result.user).then((resolve) => {
        if(resolve) {
          setUserAuth(result.user);
          changeUserData(result.user?.uid, {lastLoginAt: new Date(result.user.metadata.lastSignInTime as string).getTime()});
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
    const creationTime = new Date(user.metadata.creationTime as string).getTime();
    const lastLoginAt = new Date(user.metadata.lastSignInTime as string).getTime();
    const difference = lastLoginAt - creationTime
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

  React.useEffect(() => {
    if(userAuth) {
      getData<UserDB|null>(`usuarios/${userAuth.uid}`, setUserDB);
    } else {
      setUserDB(null);
    }
  },[userAuth, userDBChanged]);

  return (
    <AuthGoogleContext.Provider value={{
      userAuth,
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