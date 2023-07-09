import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { changeUserData } from '@/services/firebase';

import InputText from './InputText';
import Button from './Button';
import useForm from '@/hooks/useForm';

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
    h6 {
      text-align: right;
    }
  }
`;

interface PropsProfileForm {
  userDB: UserDB;
  setUserDBChanged: React.Dispatch<React.SetStateAction<number|null>>;
}

const ProfileForm = ({userDB, setUserDBChanged}:PropsProfileForm) => {
  const {push} = useRouter();
  const phoneNumber = useForm('contact');
  const street = useForm(null);
  const streetNumber = useForm(null);
  const neighborhood = useForm(null);
  const reference = useForm(null);
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Salvar alterações',
    msg: null,
    status: null
  });


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
    if(
      (userDB.userData.phoneNumber ? true : !phoneNumber.error) &&
      (userDB.userData.street ? true : !street.error) &&
      (userDB.userData.streetNumber ? true : !streetNumber.error) &&
      (userDB.userData.neighborhood ? true : !neighborhood.error) &&
      (userDB.userData.reference ? true : !reference.error)
    ) {
      const formData = new FormData(event.currentTarget);
      const formDataEntriesArray = Array.from(formData.entries());
      const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
      
      changeUserData(userDB.uid, formObjectChangedKeys);
      setUserDBChanged(Date.now())
      push('entregar');
    } else {
      setStatusSubmit({
        label: 'Salvar alterações',
        msg: 'Preencha todos os campos',
        status: 'error'
      })
      return;
    }
  }

  return (
    <FormContainer onSubmit={handleChangeProfile}>
      <div className='profileData'>
        <InputText
          label="Contato:" type="text" name="phoneNumber"
          placeholder={userDB.userData.phoneNumber}
          {...phoneNumber}
        />
        <InputText
          label="Rua ou Av:" type="text" name="street"
          placeholder={userDB.userData.street}
          {...street}
        />
        <InputText
          label="Nº:" type="text" name="streetNumber"
          placeholder={userDB.userData.streetNumber}
          {...streetNumber}
        />
        <InputText
          label="Bairro:" type="text" name="neighborhood"
          placeholder={userDB.userData.neighborhood}
          {...neighborhood}
        />
        <InputText
          label="Ref:" type="text" name="reference"
          placeholder={userDB.userData.reference}
          {...reference}
        />
      </div>
      <p style={{width: '280px'}}><strong>ATENÇÃO!</strong> Para prosseguir, todos os campos devem ser preenchidos.</p>
      <Button
        label='Salvar alterações'
        statusSubmit={statusSubmit}
        setStatusSubmit={setStatusSubmit}
        className='saveChangesButton'
      />
    </FormContainer>
  )
}

export default ProfileForm;