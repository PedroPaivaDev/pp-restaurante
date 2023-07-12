import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { getData } from '@/services/firebase';

import FilterSearchBox from '../Forms/FilterSearchBox';
import CustomersMapper from './CustomersMapper';
import getOptionValue from '@/helper/getOptionValue';
import getOption from '@/helper/getOption';

const DivCustomersDB = styled.div`
  
`;

interface PropsCustomersDB {
  setUserCustomer: React.Dispatch<React.SetStateAction<UserDB|null>>
}

const CustomersDB = ({setUserCustomer}:PropsCustomersDB) => {
  const { push } = useRouter();
  const [customers, setCustomers] = React.useState<UsersDB|null>(null);

  function filteredData(data:UsersDB, filterText:string):UsersDB {
    const arrayObjectKeyNameValueUid:ObjectKeyString[] = [];
    Object.keys(data).forEach(customerId => {
      arrayObjectKeyNameValueUid.push({
        [data[customerId].userData.displayName]: data[customerId].uid
      })
    });

    const filteredArrayObjectKeyNameValueUid = arrayObjectKeyNameValueUid.filter(objectNameUid =>
      getOption(objectNameUid).toLowerCase().includes(filterText.toLowerCase())
    );
    
    let arrayObjectUserDB:UsersDB = {}; //alterar isso para que retorne um objeto
    filteredArrayObjectKeyNameValueUid.forEach(objectNameUid => {
      arrayObjectUserDB = {
        ...arrayObjectUserDB,
        [getOptionValue(objectNameUid)]: data[getOptionValue(objectNameUid)]
      }
    })

    return arrayObjectUserDB;
  }

  function showCustumerProfile(customer:UserDB) {
    setUserCustomer(customer);
    push('admin?categoria=Cliente')
  }

  React.useEffect(() => {
    getData<UsersDB|null>('usuarios', setCustomers);
  },[]);

  return (
    <DivCustomersDB className='envelope animeLeft'>
      <div className='wrapper'>
        <h1>Clientes Cadastrados</h1>
        {customers && <FilterSearchBox
          data={customers}
          filterMethod={filteredData}
          onClickMethod={showCustumerProfile}
          renderItem={CustomersMapper}
        />}
      </div>
    </DivCustomersDB>
  )
}

export default CustomersDB;