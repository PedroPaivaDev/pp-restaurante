import React from 'react';
import styled from 'styled-components';

import getNameById from '@/helper/getNameById';

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
    opacity: 0.7;
  }
  .label:hover, .input:checked + .label {
    color: ${props => props.theme.colors.quaternaryColor};
    opacity: 1;
  }
  .label::after {
    border: 2px solid ${props => props.theme.colors.secondaryColor};
    border-radius: 10px;
    position: absolute;
    top: 1px;
    left: -33px;
    content: "";
    width: 30px;
    height: 15px;
  }
  .label::before {
    border: 2px solid ${props => props.theme.colors.quintenaryColor};
    position: absolute;
    background-color: rgb(242,227,204);
    top: 1px;
    left: -33px;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    content: "";
    transition: 0.3s;
  }
  .input:checked + .label::before {
    background-color: ${props => props.theme.colors.sucess};
    left: -18px;
    z-index: 2;
  }
`;

interface PropsCheckbox {
  options: string[];
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  name: string;
  className?: string;
  admin?: (target:EventTarget & HTMLInputElement) => void;
  menuProducts?: MenuProducts;
}

function Checkbox ({options, state, setState, name, className, admin, menuProducts, ...props}:PropsCheckbox) {

  function handleOnChange({target}:{target:EventTarget & HTMLInputElement}) {
    if(target.checked) {
      admin && admin(target);
      setState([...state, target.value]);
    } else {
      admin && admin(target);
      setState(state.filter(item => item !== target.value));
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
            name={name}
            {...props}
          />
          <label htmlFor={`${name + option}`} className='label'>
            {menuProducts ? getNameById(option,menuProducts) : option}
          </label>
        </div>
      )}
    </CheckboxContainer>
  )
}

export default Checkbox;