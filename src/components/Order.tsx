import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import useForm from '@/hooks/useForm';

import InputText from './Forms/Input';
import Select from './Forms/Select';
import styled from 'styled-components';

const OrderContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Order = () => {
  const client = useForm('client', '');
  const contact = useForm('contact', '', 'contact');
  const [payment, setPayment] = useLocalStorage('payment', '');

  return (
    <OrderContainer>
      <form>
        <InputText
          label="Nome:" type="text" name="client"
          placeholder={"Digite seu nome"} {...client}
        />
        <InputText label="Contato:" type="text" name="contact"
          placeholder={"(37) 9 9999-9999"} {...contact}
        />
        <Select
          label={"Pagamento:"}
          initial="Escolha a forma"
          options={["Transferência", "Pix", "Cartão de Débito", "Dinheiro", "Cartão de Crédito (parcelado)"]}
          selectedOption={payment} setSelectedOption={setPayment}
        />
      </form>
    </OrderContainer>
  )
}

export default Order;