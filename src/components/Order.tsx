import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import useForm from '@/hooks/useForm';

import InputText from './Forms/InputText';
import Select from './Forms/Select';
import styled from 'styled-components';
import Checkbox from './Forms/Checkbox';

const OrderContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .deliveryAddress {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Order = () => {
  const client = useForm('client', '');
  const contact = useForm('contact', '', 'contact');
  const [payment, setPayment] = useLocalStorage<string>('payment', '');
  const [delivery, setDelivery] = useLocalStorage<string[]>('delivery', []);

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
          label="Pagamento:"
          initial="Escolha a forma"
          options={["Transferência", "Pix", "Cartão de Débito", "Dinheiro", "Cartão de Crédito (parcelado)"]}
          name="payment"
          selectedOption={payment} setSelectedOption={setPayment}
        />
      </form>
      <div className='payment'>
        <Checkbox
          options={["Pagar pela entrega (+R$5,00)"]}
          state={delivery}
          setState={setDelivery}
          name="delivery"
        />
      </div>
    </OrderContainer>
  )
}

export default Order;