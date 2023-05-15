import React from 'react';
import styled from 'styled-components';

const DivInputRadio = styled.div`
  & label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
    background-color: ${props => props.theme.colors.primaryColor};
    padding: 5px 10px;
    min-width: 110px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
  }

  & input {
    display: none;
  }

  & label span {
    color: ${props => props.theme.colors.tertiaryColor};
  }

  & label .option {
    position: absolute;
    top: -20px;
  }

  & label:hover, & input:checked + label {
    opacity: 1;
  }
`;

interface PropsInputRadio {
  option?: number;
  state: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  className?: string;
}

function InputRadio({
  option, state, setState, name, className, ...props
}:PropsInputRadio) {
  return (
    <DivInputRadio>
      <input
        id={`${name + option}`}
        value={name}
        checked={state === name}
        onChange={(event:React.ChangeEvent<HTMLInputElement>) =>
          setState(event.target.value)
        }
        type="radio"
        {...props}
      />
      <label htmlFor={`${name + option}`}>
        <span className={className}>{name}</span>
        {option && <span className='option'>R${option.toFixed(2)}</span>}
      </label>
    </DivInputRadio>
  )
}

export default InputRadio;