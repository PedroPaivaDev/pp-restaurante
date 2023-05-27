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
  const [payment, setPayment] = useLocalStorage<OptionsObject|null>('payment', {});
  const [installmentCard, setInstallmentCard] = React.useState<OptionsObject|null>({});
  const [delivery, setDelivery] = useLocalStorage<string[]>('delivery', []);

  const paymentsForms = {
    "Transferência": null,
    "Pix": null,
    "Cartão de Débito": null,
    "Dinheiro": null,
    "Cartão de Crédito": null
  }

  const installmentCardPayment = {
    "1x": 0,
    "2x": 0.065,
    "3x": 0.073,
    "4x": 0.08,
    "5x": 0.087
  }

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
          name="payment"
          label="Pagamento:"
          initial="Escolha a forma"
          options={paymentsForms}
          selectedOption={payment} setSelectedOption={setPayment}
        />
        {payment && Object.keys(payment)[0]==="Cartão de Crédito" &&
          <Select
            name='installment'
            label={"Parcelas:"}
            initial="Selecione aqui"
            options={installmentCardPayment}
            selectedOption={installmentCard} setSelectedOption={setInstallmentCard}
          />
        }
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