import React from 'react';
import styled from 'styled-components';

import { changeProductAvailability, getData } from '@/services/firebase';
import getMenuProductsIdsByCategories from '@/helper/getMenuProductsIdsByCategories';
import createObjectFromEntries from '@/helper/createObjectFromEntries';
import splitPortionId from '@/helper/splitPortionId';
import sendMenuToWhatsapp from '@/helper/sendMenuToWhatsapp';

import Grid from '../Grid';
import Checkbox from '../Forms/Checkbox';
import InputText from '../Forms/InputText';
import Button from '../Forms/Button';

const DivDailyMenu = styled.div`
  form {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .categories {
    display: flex;
  }
  .category {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .divCheckbox {
    margin-left: 30px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: auto;
    flex-wrap: wrap;
  }
  .inputGroup {
    .label {
      opacity: 0.4;
    }
    .label:hover, .input:checked + .label {
      color: ${props => props.theme.colors.primaryColor};
      opacity: 1;
    }
    .label::before {
      border: 2px solid ${props => props.theme.colors.primaryColor};
    }
  }
`;

const DailyMenu = () => {
  const [menu, setMenu] = React.useState<Menu|null>(null);
  const [menuOptionsIds, setMenuOptionsIds] = React.useState<ObjectArrayString|null>(null);
  const [available, setAvailable] = React.useState<string[]>([]);

  function handleSubmitMenuMsg(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataEntriesArray = Array.from(formData.entries());
    const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
    menu && sendMenuToWhatsapp(formObjectChangedKeys, available, menu.products)
  }

  function getAvailableProducts(menuProducts:MenuProducts):string[] {
    const arrayAllPortionsAvailables:string[] = [];
    Object.keys(menuProducts).forEach(category =>
      Object.keys(menuProducts[category].products).forEach(type =>
        Object.keys(menuProducts[category].products[type].products).forEach(portion => {
          if(menuProducts[category].products[type].products[portion].available)
          arrayAllPortionsAvailables.push(`${portion}`)
        })
      )
    )
    return arrayAllPortionsAvailables;
  }

  function handleAvailability(target:EventTarget & HTMLInputElement) {
    changeProductAvailability(splitPortionId(target.value).category, splitPortionId(target.value).type, target.value, target.checked);
  }

  React.useEffect(() => {
    getData<Menu|null>('cardapio', setMenu)
  },[]);

  React.useEffect(() => {
    menu && setMenuOptionsIds(getMenuProductsIdsByCategories(menu.products))
  },[menu]);

  React.useEffect(() => {
    menu && menuOptionsIds && setAvailable(getAvailableProducts(menu?.products));
  },[menu, menuOptionsIds]);

  return (
    <DivDailyMenu className='envelope animeLeft'>
      <h1>Cardápio do Dia</h1>
      <form onSubmit={handleSubmitMenuMsg}>
        <InputText label='Mensagem do Dia:' type="text" name="day-msg"/>
        <Button label='Enviar pelo WhatsApp'/>
      </form>
      {menuOptionsIds && <div className='row'>
        {Object.keys(menuOptionsIds).map(category =>
          <Grid key={category}
            xs={12} sm={6} md={4} lg={3}
          >
            <div className='bgPaper category'>
              <h2>{category.toUpperCase()}</h2>
              <Checkbox
                options={menuOptionsIds[category]}
                state={available}
                setState={setAvailable}
                name={category}
                className='divCheckbox'
                admin={handleAvailability}
                menuProducts={menu?.products}
              />
            </div>
          </Grid>
        )}
      </div>}
    </DivDailyMenu>
  )
}

export default DailyMenu;