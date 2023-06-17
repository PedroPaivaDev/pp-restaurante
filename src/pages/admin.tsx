import React from 'react';

import withAdmin from '@/utils/withAdmin';
import SignIn from '@/components/Forms/SignIn';
import DailyMenu from '@/components/Admin/DailyMenu';

const Admin = () => {
  return (
    <div className='page'>
      <div className='container'>
        <div className="envelope animeLeft">
          <div className='wrapper'>
            <h1>Página da Admistração do Restaurante</h1>
            <SignIn />
          </div>
          <DailyMenu />
        </div>
      </div>
    </div>
  )
}

export default withAdmin(Admin);