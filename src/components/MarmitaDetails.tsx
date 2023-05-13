import React from 'react';
import styled from 'styled-components';

import getPortions from '@/helper/getPortions';

const BgPaper = styled.div`
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
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 10px;
  * {
    color: ${props => props.theme.colors.primaryColor};    
  }
`;
interface PropsMarmitaDetails {
  marmita: Marmita;
}
const MarmitaDetails = ({marmita}:PropsMarmitaDetails) => {
  return (
    <BgPaper className='bgPapel'>
      {getPortions(marmita).map(item => <p key={item}>{item}</p>)}
    </BgPaper>
  )
}

export default MarmitaDetails;