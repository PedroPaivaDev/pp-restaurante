import React from 'react';
import styled from 'styled-components';

import useLocalStorage from '@/hooks/useLocalStorage';
import useForm from '@/hooks/useForm';
import getOption from '@/helper/getOption';

import InputText from './Forms/InputText';
import Select from './Forms/Select';
import Checkbox from './Forms/Checkbox';
import Button from './Forms/Button';
import handleOrderSubmit from '@/helper/handleOrderSubmit';

const OrderContainer = styled.div`
  .form {
    .buttonSubmit {
      justify-content: center;
      button {
        background-color: ${props => props.theme.colors.sucess};
      }
    }
    .formInputs {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 25px;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
      .clientData, .deliveryAndPrice, .deliveryAddress {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 25px;
        .price {
          font-size: 1.25rem;
          text-align: end;
          margin-top: 0px;
          span {
            font-size: 1.5rem;
            vertical-align: baseline;
          }
        }
      }
    }
    @media (max-width:640px) {
      .formInputs {
        flex-direction: column;
        align-items: center;
      }
      .clientData, .deliveryAndPrice, .deliveryAddress {
        justify-content: flex-end;
        width: 280px;
      }
    }
  }
`;

const Order = ({bag, menu}:{bag:Bag, menu:Menu}) => {  
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Enviar Pedido',
    status: null,
    msg: null
  });

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

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataEntries = Array.from(formData.entries())
    console.log(formDataEntries)

    if(client.value.length<=0 || contact.value.length<=0 || client.error || contact.error || totalPrice===0 || !payment || (getOption(payment)==="Cartão de Crédito" && !installmentCard) || (delivery && (street.value.length<=0 || number.value.length<=0 || neighborhood.value.length<=0))) {
      setStatusSubmit({
        label: 'Enviar Pedido',
        status: 'error',
        msg: 'Preencha os campos corretamente'
      })
      return;
    } else {
      handleOrderSubmit(bag, formDataEntries as FormDataEntries, totalPrice, menu.products);
    }

  }

  React.useEffect(() => {
    let sumPrices = delivery.includes("Solicitar entrega (+R$5,00)") ? 5 : 0;
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
      <form className='form' onSubmit={handleSubmit}>
        <div className='formInputs'>
          <div className='clientData'>
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
            <Checkbox
              options={["Solicitar entrega (+R$5,00)"]}
              state={delivery}
              setState={setDelivery}
              name="delivery"
            />
          </div>
          <div className='deliveryAndPrice'>
            {delivery.includes("Solicitar entrega (+R$5,00)") &&
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
        </div>
        <Button
          label='Enviar Pedido'
          statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
          className='buttonSubmit'
        />
      </form>
    </OrderContainer>
  )
}

export default Order;