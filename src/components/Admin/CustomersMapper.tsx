import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';

import timestampToDate from '@/helper/timestampToDate';
import Grid from '../Grid';

const DivCustomersMapper = styled.div`
  .customerHeader {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    img {
      border: 2px solid ${props => props.theme.colors.primaryColor};
      border-radius: 40px;
      box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
      transition: 0.3s;
    }
    .customerName {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export interface PropsCustomersMapper {
  customer: UserDB;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const CustomersMapper = ({customer, onClick}:PropsCustomersMapper) => {  
  return (
    <Grid xs={12} sm={6} md={6} lg={4}>
      <DivCustomersMapper className='bgPaper' onClick={onClick}>
        <div className='customerHeader'>
          <Image src={customer.userData.photoURL}
            width={80} height={80} alt='photoURL'
          />
          <div className='customerName'>
            <h2>{customer.userData.displayName}</h2>
            <small>{customer.userData.email}</small>
            <small>
              cadastro: {timestampToDate(customer.userData.createdAt as number)}
            </small>
            <small>último login: {timestampToDate(customer.userData.lastLoginAt as number)}</small>
          </div>
        </div>
        <p>Contato: {customer.userData.phoneNumber}</p>
        <p>Endereço: {customer.userData.street}, {customer.userData.streetNumber}, Bairro {customer.userData.neighborhood}. Ponto de referência: {customer.userData.reference}</p>
        {customer.userOrders &&
          <p>Quantidade de Pedidos: {Object.keys(customer.userOrders as UserOrders).length}</p>
        }
      </DivCustomersMapper>
    </Grid>
  )
}

export default CustomersMapper;