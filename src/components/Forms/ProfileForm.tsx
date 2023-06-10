import React from 'react';
import styled from 'styled-components';

import { changeUserData } from '@/services/firebase';

import InputText from './InputText';
import Button from './Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  .profileData {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`;

const ProfileForm = ({userDB}:{userDB:UserDB}) => {

  function createObjectFromEntries(entriesArray:Array<[string, string]>) {
    let objectWithEntries:ObjectKeyString = {};
    entriesArray.forEach(entry => {
      if(entry[1] !== '') {
        objectWithEntries = {
          ...objectWithEntries,
          [entry[0]]: entry[1]
        }
      }
    });
    return objectWithEntries;
  }

  function handleChangeProfile(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataEntriesArray = Array.from(formData.entries());
    const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);

    changeUserData(userDB.uid, formObjectChangedKeys);
  }

  return (
    <FormContainer onSubmit={handleChangeProfile}>
      <div className='profileData'>
        <InputText
          label="Contato:" type="text" name="phoneNumber"
          placeholder={userDB.userData.phoneNumber}
        />
        <InputText
          label="Rua/Av:" type="text" name="street"
          placeholder={userDB.userData.street}
        />
        <InputText
          label="Nº:" type="text" name="streetNumber"
          placeholder={userDB.userData.streetNumber}
        />
        <InputText
          label="Bairro:" type="text" name="neighborhood"
          placeholder={userDB.userData.neighborhood}
        />
        <InputText
          label="Ref:" type="text" name="reference"
          placeholder={userDB.userData.reference}
        />
      </div>
      <Button label='Salvar alterações'/>
    </FormContainer>
  )
}

export default ProfileForm;