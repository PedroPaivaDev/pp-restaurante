import React from 'react';
import Portion from '@/components/Portion';

const Menu = () => {
  return (
    <div className='page'>
      <div className="container">
        <div className="envelope">
          <h1>Cardápio do Dia</h1>
          <div className="wrapper">
            <Portion ingredient='Arroz Branco'/>
            <Portion ingredient='Arroz ao Alho'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;