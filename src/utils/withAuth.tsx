import React from "react";
import { useRouter } from "next/router";
import { AuthGoogleContext } from "@/contexts/AuthGoogleContext";

export default function withAuth(WrappedComponent: React.ElementType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props:any) => {    
    const {userAuth, userDB} = React.useContext(AuthGoogleContext);
    const {replace} = useRouter();

    React.useEffect(() => {
      if(userAuth && (
        userDB?.userData.phoneNumber &&
        userDB?.userData.street &&
        userDB?.userData.streetNumber &&
        userDB?.userData.neighborhood &&
        userDB?.userData.reference
      )) {
        console.log('autenticado e cadastro completo')
      } else {
        replace('/perfil')
      }
    // eslint-disable-next-line
    },[userAuth, userDB]);

    return <WrappedComponent {...props}/>
  }
  return Wrapper;
}