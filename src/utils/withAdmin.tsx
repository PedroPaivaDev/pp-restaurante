import React from "react";
import { AuthGoogleContext } from "@/contexts/AuthGoogleContext";

export default function withAdmin(WrappedComponent:React.ComponentType<JSX.Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props:any) => {
    const {userAuth, userDB} = React.useContext(AuthGoogleContext);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      if(userAuth) {
        setIsAuthenticated(true);
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