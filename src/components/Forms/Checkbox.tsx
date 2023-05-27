import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 5px;
  .inputGroup {
    position: relative;
  }
  .label {
    position: relative;
    transition: 0.3s;
    cursor: pointer;
    line-height: 32px;
  }
  .label:hover, .input:checked + .label {
    color: ${props => props.theme.colors.quaternaryColor};
  }
  .label::before {
    border: 2px solid ${props => props.theme.colors.secondaryColor};
    position: absolute;
    top: 1px;
    left: -18px;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    content: "";
  }
  .input:checked + .label::before {
    background-color: ${props => props.theme.colors.quaternaryColor};
    z-index: 2;
  }
`;

interface PropsCheckbox {
  options: string[];
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  name: string;
  className?: string;
}

function Checkbox ({options, state, setState, name, className, ...props}:PropsCheckbox) {

  function handleOnChange({target}:{target:EventTarget & HTMLInputElement}) {
    if(target.checked) {
      setState([...state, target.value])
    } else {
      setState(state.filter(item => item !== target.value))
    }
  }

  function handleChecked(option:string) {
    return state.includes(option);
  }

  return (
    <CheckboxContainer className={className}>
      {options.map(option => 
        <div key={`${name + option}`} className='inputGroup'>
          <input
            id={`${name + option}`}
            value={`${option}`}
            checked={handleChecked(option)}
            onChange={handleOnChange}
            type='checkbox'
            className='input'
            {...props}
          />
          <label htmlFor={`${name + option}`} className='label'>
            {`${option}`}
          </label>
        </div>
      )}
    </CheckboxContainer>
  )
}

export default Checkbox;