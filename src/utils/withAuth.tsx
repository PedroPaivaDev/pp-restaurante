import React from "react";
import { useRouter } from "next/router";
import { AuthGoogleContext } from "@/contexts/AuthGoogleContext";

export default function withAuth(WrappedComponent:React.ComponentType<JSX.Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props:any) => {    
    const {userAuth, userDB} = React.useContext(AuthGoogleContext);
    const {replace} = useRouter();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      if(userAuth && (
        userDB?.userData.phoneNumber &&
        userDB?.userData.street &&
        userDB?.userData.streetNumber &&
        userDB?.userData.neighborhood &&
        userDB?.userData.reference
      )) {
        setIsAuthenticated(true);
      } else if(userAuth===null) {
        setIsAuthenticated(false);
        replace('/perfil')
      } else {
        setIsAuthenticated(false);
      }
    // eslint-disable-next-line
    },[userAuth, userDB]);

    if(isAuthenticated) {
      return <WrappedComponent {...props}/>;
    } else {
      return null;
    }
  }
  return Wrapper;
}