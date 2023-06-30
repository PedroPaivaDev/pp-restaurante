import React from 'react';
import { useRouter } from 'next/router';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import SignIn from '@/components/Forms/SignIn';
import SubNavBar from '@/components/SubNavBar';
import ProfileData from '@/components/ProfileData';

const Perfil = () => {
  const {query} = useRouter();
  const {userAuth, userDB, setUserDBChanged} = React.useContext(AuthGoogleContext);

  return (
    <div className='page animeLeft'>
      {userAuth && userDB ?
        <>
          <SubNavBar
            categories={["Pedido","Historico","Dados"]}
            path={"perfil"}
            endpoint={query.categoria as string}
          />
          <div className='container'>
            {query.categoria==='Dados' && <ProfileData userDB={userDB} setUserDBChanged={setUserDBChanged}/>}
          </div>
        </> :
        <>
          <p style={{marginTop:'25px'}}>Faça login com a sua conta do Google, para completar o seu cadastro e prosseguir para a página de Entrega</p>
          <SignIn />
        </>
      }
    </div>
  )
}

export default Perfil;