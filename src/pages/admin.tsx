import React from 'react';
import { useRouter } from 'next/router';

import withAdmin from '@/utils/withAdmin';
import DailyMenu from '@/components/Admin/DailyMenu';
import SubNavBar from '@/components/SubNavBar';

const Admin = () => {
  const {query} = useRouter();

  return (
    <div className='page animeLeft'>
      <SubNavBar
        categories={["Cardapio", "Pedidos", "Historico"]}
        path={"admin"}
        endpoint={query.categoria as string}
      />
      <div className='container'>
        {query.categoria===undefined && 
          <div className='wrapper'>
            <h1>Página da Administração do Restaurante</h1>
            <p>Selecione uma das categorias acima</p>
          </div>
        }
        {query.categoria==='Cardapio' && <DailyMenu />}
        {query.categoria==='Pedidos' && <div className='envelope'>Pedidos</div>}
        {query.categoria==='Historico' && <div className='envelope'>Hstorico</div>}
      </div>
    </div>
  )
}

export default withAdmin(Admin);