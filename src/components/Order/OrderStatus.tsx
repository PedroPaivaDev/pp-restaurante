import React from 'react';
import styled from 'styled-components';

const DivOrderStatus = styled.div<BgProps>`
  margin: 10px;
  text-align: center;
  border-radius: 20px;
  padding: 0 10px;
  color: ${props => props.theme.colors.primaryColor};
  background: ${props => props.bgImage};
  box-shadow: 0 0 10px 10px ${props => props.bgImage};
`;

const OrderStatus = ({orderStatus}:{orderStatus:OrderStatus}) => {
  function handleBgStatus(status:OrderStatus) {
    if(status==='pendente') {
      return '#fcdf6a';
    } else if(status==='preparo') {
      return '#FACA08';
    } else if(status==='entrega') {
      return '#CC9132';
    } else if(status==='concluido') {
      return '#1AB912';
    } else {
      return '#f31'
    }
  }
  return (
    <DivOrderStatus bgImage={handleBgStatus(orderStatus)}>{orderStatus.toUpperCase()}</DivOrderStatus>
  )
}

export default OrderStatus;