import React from 'react';
import styled from 'styled-components';

const ContainerButton = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  button {
    background-color: ${props => props.theme.colors.quaternaryColor};
    padding: 0px 10px;
    line-height: 26px;
    border: 1px solid ${props => props.theme.colors.quintenaryColor};
    border-radius: 10px;
    color: ${props => props.theme.colors.primaryColor};
    box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
    transition: 0.3s;
    &:hover {
      background-color: ${props => props.theme.colors.quintenaryColor};
    }
  }
  .status {
    position: absolute;
    top: -20px;
    font-size: ${props => props.theme.font.size.medium};
    font-family: ${props => props.theme.font.family};
    text-align: right;
    text-shadow: 1px 1px 5px ${props => props.theme.colors.dark};
    width: 270px;
  }
  .error {
    color: ${props => props.theme.colors.error};
  }
  .sucess {
    color: ${props => props.theme.colors.sucess};
  }
`;

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  statusSubmit?: StatusSubmit;
  setStatusSubmit?: React.Dispatch<React.SetStateAction<StatusSubmit>>;
}

const Button = ({label, statusSubmit, setStatusSubmit, className, ...props}:PropsButton) => {
  function handleBg() {
    if(label==='Remover') {
      return '#f31';
    } else if(label==='Concluir Marmita') {
      return '#1AB912';
    }
  }
  React.useEffect(() => {
    if(statusSubmit?.status) {
      setTimeout(() => {
        setStatusSubmit && setStatusSubmit({
          ...statusSubmit,
          status: null,
          msg: null
        })
      }, 2000);
    }
  }, [statusSubmit, setStatusSubmit]);

  return (
    <ContainerButton className={className}>
      {statusSubmit?.status && <h6 className={`status ${statusSubmit.status}`}>{statusSubmit.msg}</h6>}
      <button style={{backgroundColor:handleBg()}} {...props}>
        {statusSubmit?.label ? statusSubmit.label : label}
      </button>
    </ContainerButton>
  )
}

export default Button;