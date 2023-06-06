import React from 'react'
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { auth } from '@/services/firebase';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = React.createContext({})

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [user, setUser] = React.useState<User>({} as User);

  React.useEffect(() => {
    const loadStorageData = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
      if(sessionToken && sessionUser) {
        setUser(JSON.parse(sessionUser))
      }
    };
    loadStorageData();
  },[])

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // sessionStorage.setItem("@AuthFirebase:token", token);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(result.user));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <AuthGoogleContext.Provider value={{signInGoogle, signed:!!user, user}}>
      {children}
    </AuthGoogleContext.Provider>
  )
}

export default AuthGoogleProvider