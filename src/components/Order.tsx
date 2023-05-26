import useForm from '@/hooks/useForm';
import React from 'react';
import InputText from './Forms/Input';

const Order = () => {
  const client = useForm('client', '');
  React.useEffect(() => {
    console.log(client.value)
  })
  return (
    <div>
      <form>
        <InputText
          label="Nome:" type="text" name="client"
          placeholder={"Digite seu nome"} {...client}
        />
      </form>
    </div>
  )
}

export default Order;