import React from 'react';
import styled from 'styled-components';

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
  margin: 20px;
  padding: 10px;
  * {
    color: ${props => props.theme.colors.primaryColor};    
  }
`;
interface PropsMarmitaDetails {
  marmita: string[];
  // id: number;
}
const MarmitaDetails = ({marmita}:PropsMarmitaDetails) => {
  return (
    <BgPaper className='bgPapel'>
      {marmita.map(item => <p key={item}>{item}</p>)}
    </BgPaper>
  )
}

export default MarmitaDetails;