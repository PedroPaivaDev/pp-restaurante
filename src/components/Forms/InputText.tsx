import React from 'react';
import styled from 'styled-components';

const InputTextContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  .input {
    color: ${props => props.theme.colors.primaryColor};
    border: 1px solid ${props => props.theme.colors.secondaryColor};
    line-height: 26px;
    padding: 2px 5px;
    border-radius: 5px;
    background: ${props => props.theme.colors.quintenaryColor};
    transition: 0.2s;
    width: 180px;
  }
  .input:focus, .input:hover {
    outline: none;
    border-color: ${props => props.theme.colors.primaryColor};
    background: ${props => props.theme.colors.tertiaryColor};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.secondaryColor}
  }
  .input:-internal-autofill-selected {
    background-color: var(--lightPink) !important;
  }
  .error {
    position: absolute;
    margin-top: 50px;
    color: ${props => props.theme.colors.error};
    font-size: 0.75rem;
  }
`;

interface PropsInputText {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | null;
  onBlur?: () => boolean;
}

const InputText = ({label, type, name, value, placeholder, onChange, error, onBlur}: PropsInputText) => {
  return (
    <InputTextContainer>
      <label htmlFor={name} className='label'>{label}</label>
      <input 
        id={name} 
        name={name} 
        className='input'
        type={type} 
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <h6 className='error'>{error}</h6>}
    </InputTextContainer>
  )
}

export default InputText;