import React from 'react';
import styled from 'styled-components';

import getPortions from '@/helper/getPortions';

const DivMarmitaDetails = styled.div`
  display: flex;
  gap: 10px;
  .bgPapel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.portionBg};
    background-position: center center;
    background-size: cover;
    border: 2px solid ${props => props.theme.colors.primaryColor};
    box-shadow: 0px 7px 20px 0px ${props => props.theme.colors.dark};
    padding: 10px;  
    width: 200px;
    height: 100%;
    padding: 10px 10px 10px 10px;
    * {
      color: ${props => props.theme.colors.primaryColor};    
    }
  }
  .marmitexButton {
  justify-content: center;
  }
  .sizeOptions {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
interface PropsMarmitaDetails {
  marmita: BagMarmita;
  id: string;
}
const MarmitaDetails = ({marmita, id}:PropsMarmitaDetails) => {
  return (
    <DivMarmitaDetails>
      <div className='bgPapel'>
        <span>{marmita.size}: {id.substring(4)}</span>
        {getPortions(marmita.portions).map(item => <p key={item}>{item}</p>)}
      </div>
    </DivMarmitaDetails>
  )
}

export default MarmitaDetails;