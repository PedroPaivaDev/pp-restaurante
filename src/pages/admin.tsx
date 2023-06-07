import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Forms/Button';
import InputText from '@/components/Forms/InputText';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  h1 {
    width: 100%;
  }
`;

const admin = () => {
  function handleLogin(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('entrou');
  }
  return (
    <div className='page'>
      <div className='container'>
        <div className="envelope animeLeft">
          <div className='wrapper'>
            <LoginForm onSubmit={handleLogin}>
              <h1>Página da Admistração</h1>
              <InputText label='Login:' type='text' name='login'/>
              <InputText label='Senha:' type='password' name='senha'/>
              <Button label='Entrar'/>
            </LoginForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default admin;