import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  .select {
    color: ${props => props.theme.colors.primaryColor};
    border: 1px solid ${props => props.theme.colors.secondaryColor};
    line-height: 26px;
    padding: 2px 5px;
    border-radius: 5px;
    background: ${props => props.theme.colors.quintenaryColor};
    transition: 0.2s;
    width: 180px;
    cursor: pointer;
    option {
      color: ${props => props.theme.colors.primaryColor};
    }
  }
  .select:focus, .select:hover {
    outline: none;
    border-color: ${props => props.theme.colors.primaryColor};
    background: ${props => props.theme.colors.tertiaryColor};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.secondaryColor}
  }
`;

interface PropsSelect {
  initial: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  name: string;
  value?: string[];
  className?: string;
}

const Select = ({initial, options, selectedOption, setSelectedOption, className, label, name, value}:PropsSelect) => {

  function handleChange({target}:{target:HTMLSelectElement}) {
    setSelectedOption(target.value)
  }

  return (
    <SelectContainer className={className}>
      <label htmlFor={label}>{label}</label>
      <select name={name} id={label} value={selectedOption} onChange={handleChange} className='select'>
        <option value="" disabled>{initial}</option>
        {options.map((option, index) => (
          value ?
          <option key={option} value={value[index]}>{option}</option> :
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </SelectContainer>
  )
}

export default Select;