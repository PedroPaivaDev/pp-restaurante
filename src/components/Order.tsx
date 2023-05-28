import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import useForm from '@/hooks/useForm';

import InputText from './Forms/InputText';
import Select from './Forms/Select';
import styled from 'styled-components';
import Checkbox from './Forms/Checkbox';
import getOption from '@/helper/getOption';

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

const Order = ({bag}:{bag:Bag}) => {  
  const [totalPrice, setTotalPrice] = React.useState(0);

  const client = useForm('client', '');
  const contact = useForm('contact', '', 'contact');
  const [payment, setPayment] = useLocalStorage<OptionsObject|null>('payment', null);
  const [installmentCard, setInstallmentCard] = React.useState<OptionsObject|null>(null);
  const [delivery, setDelivery] = useLocalStorage<string[]>('delivery', []);
  const street = useForm('street', '');
  const number = useForm('number', '');
  const neighborhood = useForm('neighborhood', '');
  const reference = useForm('reference', '');

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

  function numberfyInstallment(installment:string) {
    const split = installment.split("x");
    return Number(split[0]);
  }

  React.useEffect(() => {
    let sumPrices = delivery.includes("Pagar pela entrega (+R$5,00)") ? 5 : 0;
    if(payment && installmentCard && getOption(payment)==="Cartão de Crédito") {
      Object.keys(bag).length>0 && Object.keys(bag).forEach(marmitaId => {
        sumPrices = sumPrices + bag[marmitaId].price;
      })
      setTotalPrice(
        sumPrices + sumPrices * (installmentCard[getOption(installmentCard)] as number)
      );
    } else {
      Object.keys(bag).length>0 && Object.keys(bag).forEach(marmitaId => {
        sumPrices = sumPrices + bag[marmitaId].price;
      })
      setTotalPrice(sumPrices);
    }
  }, [bag, payment, installmentCard, delivery])

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
        {payment && getOption(payment)==="Cartão de Crédito" &&
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
        {delivery.includes("Pagar pela entrega (+R$5,00)") &&
          <div className='deliveryAddress'>
            <InputText label="Rua/Av:" type="text" name="street"
              placeholder={"Informe a rua"} {...street}
            />
            <InputText label="Nº:" type="text" name="number"
              placeholder={"Informe o número"} {...number}
            />
            <InputText label="Bairro:" type="text" name="neighborhood"
              placeholder={"Informe o bairro"} {...neighborhood}
            />
            <InputText label="Ref.:" type="text" name="reference"
              placeholder={"Ponto de referência"} {...reference}
            />
          </div>
        }
        {(installmentCard && payment && getOption(payment)==="Cartão de Crédito") ?
          <h1 className='price'>
            {numberfyInstallment(getOption(installmentCard))} Parcelas de <span>R${(totalPrice/numberfyInstallment(getOption(installmentCard))).toFixed(2)}</span>
          </h1> :
          <h1 className='price'>Preço Total: <span>R${totalPrice.toFixed(2)}</span></h1>
        }
      </div>
    </OrderContainer>
  )
}

export default Order;