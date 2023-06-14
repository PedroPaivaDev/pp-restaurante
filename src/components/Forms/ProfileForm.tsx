import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
  .saveChangesButton {
    justify-content: flex-end;
  }
`;

interface PropsProfileForm {
  userDB: UserDB;
  setUserDBChanged: React.Dispatch<React.SetStateAction<number|null>>;
}

const ProfileForm = ({userDB, setUserDBChanged}:PropsProfileForm) => {
  const {push} = useRouter();

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
    setUserDBChanged(Date.now())
    push('entregar');
  }

  return (
    <FormContainer onSubmit={handleChangeProfile}>
      <div className='profileData'>
        <InputText
          label="Contato:" type="text" name="phoneNumber"
          placeholder={userDB.userData.phoneNumber}
        />
        <InputText
          label="Rua ou Av:" type="text" name="street"
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
      <p style={{width: '280px'}}><strong>ATENÇÃO!</strong> Para prosseguir, todos os campos devem ser preenchidos.</p>
      <Button label='Salvar alterações' className='saveChangesButton'/>
    </FormContainer>
  )
}

export default ProfileForm;