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

  & label .price {
    position: absolute;
    top: -20px;
  }

  & label:hover, & input:checked + label {
    opacity: 1;
  }
`;

interface PropsInputRadio {
  options: {[key:string]: number | null};
  state: {[key:string]: number | null};
  setState: React.Dispatch<React.SetStateAction<{[key:string]: number | null}>>;
  name: string;
  className?: string;
}

/**
* @param options deve ser um objeto, que cada chave é uma string, que pode ou não ter um valor (preço) definido.
* @returns um input do tipo 'radio' e um span com o valor da opção, caso esse valor seja fornecido no objeto. O valor armazenado no estado será um objeto com a chave(opção) e valor(preço).
*/
function InputRadio({
  options, state, setState, name, className, ...props
}:PropsInputRadio) {

  function handleChecked(option:string) {
    if(Object.keys(state).includes(option)) {
      return true;
    } else {
      return false
    }
  }

  function getValue(option: string | null): number | null {
    if(option) {
      return options[option];
    } else {
      return null;
    }
  }

  return (
    <DivInputRadio className={className}>
      {Object.keys(options).map(option => 
        <div key={option} className='inputGroup'>
          <input
            id={`${name + option}`}
            value={option}
            checked={handleChecked(option)}
            onChange={({target}) => setState({[target.value]: options[target.value]})}
            type="radio"
            {...props}
          />
          <label htmlFor={`${name + option}`}>
            <span>{option}</span>
            {getValue(option) && <span className='price'>
              R${getValue(option)?.toFixed(2)}
            </span>}
          </label>
        </div>
      )}
    </DivInputRadio>
  )
}

export default InputRadio;