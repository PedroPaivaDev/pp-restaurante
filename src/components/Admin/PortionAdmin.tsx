import React from 'react';
import styled from 'styled-components';

import { removePhotoFromDB, removeProduct } from '@/services/firebase';
import getFileNameFromUrl from '@/helper/getFileNameByUrl';
import Button from '../Forms/Button';
import { useRouter } from 'next/router';

const PortionDetail = styled.div`
  position: relative;
  .portionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    h3 {
      color: ${props => props.theme.colors.primaryColor};
    }
    .buttonAddRemove {
      justify-content: flex-end;
      button {
        background-color: ${props => props.theme.colors.error};
      }
      h6 {
        text-align: right;
        top: -30px;
      }
    }
  }
`;

const DivImage = styled.div<BgProps>`
  width: 100%;
  min-height: 200px;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  background: ${props => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
`;

interface PropsPortionAdmin {
  ingredient: Portion;
}

const PortionAdmin = ({ingredient}:PropsPortionAdmin) => {
  const {push} = useRouter();
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Excluir',
    status: null,
    msg: null
  });

  function handleClick() {
    if(confirm("Você realmente deseja excluir este produto do banco de dados? Uma vez excluído, não será possível recuperar os dados deste produto.")) {
      removeProduct(ingredient.category, ingredient.type, ingredient.id,);
      removePhotoFromDB(ingredient.category, getFileNameFromUrl(ingredient.image[0]));
      push('admin');
    } else {
      return;
    }
  }

  return (
    <PortionDetail className='bgPaper'>
      <div className='portionHeader'>
        <h3>{ingredient.name}</h3>
        <Button onClick={handleClick}
          statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
          className='buttonAddRemove'
        />
      </div>
      <DivImage bgImage={ingredient.image[0]}/>
    </PortionDetail>
  )
}

export default PortionAdmin;