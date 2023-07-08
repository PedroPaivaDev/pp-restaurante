import React from "react";
import { useRouter } from "next/router";

import { AuthGoogleContext } from "@/contexts/AuthGoogleContext";
import Loading from "@/components/Loading";

export default function withAdmin(WrappedComponent:React.ComponentType<JSX.Element>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props:any) => {
    const {replace} = useRouter();
    const {userAuth, userDB} = React.useContext(AuthGoogleContext);

    if(userAuth===false) {
      return <div className="page"><Loading /></div>
    } else if(userAuth===null || (userDB && !userDB.userData.admin)) {      
      replace('/');
    } else {
      return <WrappedComponent {...props}/>;
    }
  }
  return Wrapper;
}