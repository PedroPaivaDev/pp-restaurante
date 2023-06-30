import React from 'react';
import styled from 'styled-components';

import useLocalStorage from '@/hooks/useLocalStorage';
import useMediaQuery from '@/hooks/useMediaQuery';
import getOption from '@/helper/getOption';
import handleOrderSubmit from '@/helper/handleOrderSubmit';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import Select from '../Forms/Select';
import Checkbox from '../Forms/Checkbox';
import Button from '../Forms/Button';
import LinkButton from '../Forms/LinkButton';

const OrderContainer = styled.div`
  .form {
    .buttonSubmit {
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
        width: 280px;
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
      .deliveryAddressHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
      }
    }
    @media (max-width:640px) {
      .formInputs {
        flex-direction: column;
        align-items: center;
      }
      .clientData, .deliveryAddress {
        justify-content: flex-end;
        width: 280px;
      }
    }
  }
`;

const Order = ({bag, menu}:{bag:Bag, menu:Menu}) => {
  const screenWidth = useMediaQuery();
  const {userDB} = React.useContext(AuthGoogleContext);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Enviar Pedido',
    status: null,
    msg: null
  });

  const [payment, setPayment] = useLocalStorage<OptionsObject|null>('payment', null);
  const [installmentCard, setInstallmentCard] = React.useState<OptionsObject|null>(null);
  const [delivery, setDelivery] = React.useState<string[]>(["Entregar (+R$5,00)"]);

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
    if(!payment) {
      setStatusSubmit({
        label: 'Enviar Pedido',
        status: 'error',
        msg: 'Escolha uma forma de pagamento'
      })
      return;
    } else if(getOption(payment)==="Cartão de Crédito" && !installmentCard) {
      setStatusSubmit({
        label: 'Enviar Pedido',
        status: 'error',
        msg: 'Escolha a quantidade de parcelas'
      })
      console.log(formDataEntries)
      return;
    } else if(delivery.length>0 && (!userDB?.userData.street || !userDB?.userData.streetNumber || !userDB?.userData.neighborhood || !userDB?.userData.reference)) {
      setStatusSubmit({
        label: 'Enviar Pedido',
        status: 'error',
        msg: 'Altere o endereço de entrega'
      })
      return;
    } else {
      userDB && handleOrderSubmit(bag, formDataEntries as FormDataEntries, totalPrice, menu.products, userDB, screenWidth);
    }
  }

  React.useEffect(() => {
    let sumPrices = delivery.includes("Entregar (+R$5,00)") ? 5 : 0;
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
              options={["Entregar (+R$5,00)"]}
              state={delivery}
              setState={setDelivery}
              name="delivery"
            />
          </div>
          <div className='deliveryAndPrice'>
            {delivery.includes("Entregar (+R$5,00)") &&
              <div className='deliveryAddress'>
                <p>Endereço de entrega: {userDB?.userData.street}, 
                  nº {userDB?.userData.streetNumber}, 
                  Bairro {userDB?.userData.neighborhood}.
                  <br/>
                  Ponto de referência: {userDB?.userData.reference}.
                </p>
                <LinkButton label='Alterar endereço de entrega' href='perfil?categoria=Dados'/>
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