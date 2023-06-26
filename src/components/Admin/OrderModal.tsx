import React from 'react';
import OrderContent from './OrderContent';
import styled from 'styled-components';

const DivOrderModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0px;
  left: 0px;
  z-index: 10;
  padding: calc(var(--HeaderHeigth) + 10px)
          40px 
          calc(var(--FooterHeigth) + 10px + var(--paddingIPhone)) 
          40px;
`;

interface PropsOrderModal {
  modalOrder: UserOrder;
  setModalOrder: React.Dispatch<React.SetStateAction<UserOrder|null>>;
}

const OrderModal = ({modalOrder, setModalOrder}:PropsOrderModal) => {

  function handleOutsideClick(event:React.MouseEvent<HTMLDivElement>) {
    if(event.target === event.currentTarget) setModalOrder(null);
  }
  
  return (
    <DivOrderModal onClick={handleOutsideClick}>
      <OrderContent modalOrder={modalOrder}/>
    </DivOrderModal>
  )
}

export default OrderModal;