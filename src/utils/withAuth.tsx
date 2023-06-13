import React from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function withAuth(WrappedComponent: React.ElementType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props:any) => {    
    const {replace} = useRouter();    

    React.useEffect(() => {
      const FirebaseUserUid = Cookie.get('FirebaseUserUid');
      if(!FirebaseUserUid) {
        replace('/');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return <WrappedComponent {...props}/>
  }
  return Wrapper;
}