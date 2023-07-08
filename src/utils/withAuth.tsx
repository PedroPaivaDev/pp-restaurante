import React from "react";
import { useRouter } from "next/router";

import { AuthGoogleContext } from "@/contexts/AuthGoogleContext";
import Loading from "@/components/Loading";

export default function withAuth(WrappedComponent:React.ComponentType<JSX.Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props:any) => {    
    const {userAuth, userDB} = React.useContext(AuthGoogleContext);
    const {replace} = useRouter();

    if(userAuth===false && !userDB) {
      return <div className="page"><Loading /></div>;
    } else if(userAuth===null || (userDB && !(
      userDB?.userData.phoneNumber &&
      userDB?.userData.street &&
      userDB?.userData.streetNumber &&
      userDB?.userData.neighborhood &&
      userDB?.userData.reference))) {
      replace('/perfil?categoria=Dados');
    } else {
      return <WrappedComponent {...props}/>;
    }
  }
  return Wrapper;
}