import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { getData } from '@/services/firebase';
import timestampToDate from '@/helper/timestampToDate';
import Grid from '../Grid';

const DivCustomersDB = styled.div`
  .customer {
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
      }
    }
  }
`;

const CustomersDB = () => {
  const [customers, setCustumers] = React.useState<UsersDB|null>(null);

  React.useEffect(() => {
    getData<UsersDB>('usuarios', setCustumers as React.Dispatch<React.SetStateAction<UsersDB>>);
  },[]);

  return (
    <DivCustomersDB className='envelope animeLeft'>
      <div className='wrapper'>
        <h1>Clientes Cadastrados</h1>
        <div className='row'>
          {customers && Object.keys(customers).map(customer =>
            <Grid key={customers[customer].uid}
            xs={12} sm={6} md={6} lg={4}
            >
              <div className='bgPaper customer'>
                <div className='customerHeader'>
                  <Image src={customers[customer].userData.photoURL}
                    width={80} height={80} alt='photoURL'
                  />
                  <div className='customerName'>
                    <h2>{customers[customer].userData.displayName}</h2>
                    <small>{customers[customer].userData.email}</small>
                    <small>
                      cadastro: {timestampToDate(customers[customer].userData.createdAt as number)}
                    </small>
                    <small>último login: {timestampToDate(customers[customer].userData.lastLoginAt as number)}</small>
                  </div>
                </div>
                <p>Contato: {customers[customer].userData.phoneNumber}</p>
                <p>Endereço: {customers[customer].userData.street}, {customers[customer].userData.streetNumber}, Bairro {customers[customer].userData.neighborhood}. Ponto de referência: {customers[customer].userData.reference}</p>
                {customers[customer].userOrders &&
                  <p>Quantidade de Pedidos: {Object.keys(customers[customer].userOrders as UserOrders).length}</p>
                }
              </div>
            </Grid>
          )}
        </div>
      </div>
    </DivCustomersDB>
  )
}

export default CustomersDB;