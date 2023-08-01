import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import getOption from '@/helper/getOption';
import handleOrderSubmit from '@/helper/handleOrderSubmit';
import getNameById from '@/helper/getNameById';
import getPortions from '@/helper/getPortions';
import splitPortionId from '@/helper/splitPortionId';
import getMarmitaPrices from '@/helper/getMarmitaPrices';

import Select from '../Forms/Select';
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

interface PropsOrder {
  marmita: Marmita;
  setMarmita: React.Dispatch<React.SetStateAction<Marmita>>;
  bag: Bag;
  setBag: React.Dispatch<React.SetStateAction<Bag>>
  menu: Menu;
}

const Order = ({marmita, bag, setMarmita, setBag, menu}:PropsOrder) => {
  const { push } = useRouter();
  const {userDB, setUserDBChanged} = React.useContext(AuthGoogleContext);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [unavailable, setUnavailable] = React.useState<string[]>([]);
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Enviar Pedido',
    status: null,
    msg: null
  });

  const [payment, setPayment] = useLocalStorage<OptionsObject|null>('payment', null);
  const [installmentCard, setInstallmentCard] = React.useState<OptionsObject|null>(null);

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
      return;
    } else if(!userDB?.userData.street || !userDB?.userData.streetNumber || !userDB?.userData.neighborhood || !userDB?.userData.reference) {
      setStatusSubmit({
        label: 'Enviar Pedido',
        status: 'error',
        msg: 'Endereço de entrega inválido'
      })
      return;
    } else if(unavailable.length>0) {
      setStatusSubmit({
        label: 'Enviar Pedido',
        status: 'error',
        msg: `Um ou mais produtos indisponíveis.`
      })
      alert(`Infelizmente o item ${getNameById(unavailable[0],menu.products)} ficou indisponível alguns segundos atrás. Considere editar a marmita, escolhendo outro item ou removendo este item da sua marmita.`)
      return;
    } else if(Object.keys(marmita).length>0 && !confirm("Você ainda estava montando uma marmita. Tem certeza que deseja finalizar o pedido e descartar a marmita que não foi concluída?")) {
      return
    } else {
      userDB && handleOrderSubmit(bag, formDataEntries as FormDataEntries, totalPrice, userDB, menu).then(() => {
        setUserDBChanged(Date.now());
        setMarmita({});
        setBag({});
        localStorage.clear();
        push('perfil?categoria=Pedido');
      });
    }
  }

  React.useEffect(() => {
    if(bag && menu) {
      const unavailableArray:string[] = [];
      Object.keys(bag).forEach(marmitaId => {
        getPortions(bag[marmitaId].portions).forEach(portionId => {
          const {category, type} = splitPortionId(portionId);
          if(!menu.products[category].products[type].products[portionId].available) {
            unavailableArray?.push(portionId)
          }
        })
      });
      setUnavailable(unavailableArray);
    }
  },[bag, menu]);

  React.useEffect(() => {
    let sumPrices = 0;
    if(payment && installmentCard && getOption(payment)==="Cartão de Crédito") {
      Object.keys(bag).length>0 && Object.keys(bag).forEach(marmitaId => {
        sumPrices = sumPrices + getMarmitaPrices(bag[marmitaId].size, menu.prices);
      })
      setTotalPrice(
        sumPrices + sumPrices * (installmentCard[getOption(installmentCard)] as number)
      );
    } else {
      Object.keys(bag).length>0 && Object.keys(bag).forEach(marmitaId => {
        sumPrices = sumPrices + getMarmitaPrices(bag[marmitaId].size, menu.prices);
      })
      setTotalPrice(sumPrices);
    }
  }, [bag, payment, installmentCard, menu]);

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
          </div>
          <div className='deliveryAndPrice'>
            <div className='deliveryAddress'>
              <p>Endereço de entrega: {userDB?.userData.street}, 
                nº {userDB?.userData.streetNumber}, 
                Bairro {userDB?.userData.neighborhood}.
                <br/>
                Ponto de referência: {userDB?.userData.reference}.
              </p>
              <LinkButton label='Alterar endereço de entrega' href='perfil?categoria=Dados'/>
            </div>
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