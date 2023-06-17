import React from 'react';
import styled from 'styled-components';

import { getProducts } from '@/services/firebase';
import Checkbox from '../Forms/Checkbox';
import Grid from '../Grid';

const DivDailyMenu = styled.div`
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
    .label:hover, .input:checked + .label {
      color: ${props => props.theme.colors.primaryColor};
      opacity: 1;
    }
  }
`;

interface DailyMenu {
  [key:string]: string[];
}

const DailyMenu = () => {
  const [menu, setMenu] = React.useState<Menu>();
  const [menuOptions, setMenuOptions] = React.useState<DailyMenu|null>(null);
  const [available, setAvailable] = React.useState<string[]>([]);

  function getMenuProducts(menuProducts:MenuProducts):DailyMenu {
    let arrayPortions:DailyMenu = {};
    Object.keys(menuProducts).forEach(category =>
      Object.keys(menuProducts[category].products).forEach(type =>
        Object.keys(menuProducts[category].products[type].products).forEach(option => {
          if(arrayPortions[category]) {
            arrayPortions = {
              ...arrayPortions,
              [category]: [
                ...arrayPortions[category],
                menuProducts[category].products[type].products[option].id
              ]
            }
          } else {
            arrayPortions = {
              ...arrayPortions,
              [category]: [
                menuProducts[category].products[type].products[option].id
              ]
            }
          }
        })
      )
    )
    return arrayPortions
  }

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[]);

  React.useEffect(() => {
    menu && setMenuOptions(getMenuProducts(menu.products))
  },[menu])

  React.useEffect(() => {
    console.log(available)
  },[available])

  return (
    <DivDailyMenu className='wrapper'>
      <h1>Cardápio do Dia</h1>
      {menuOptions && <div className='row'>
        {Object.keys(menuOptions).map(category =>
          <Grid key={category}
            xs={12} sm={6} md={4} lg={3}
          >
            <div className='bgPaper category'>
              <h2>{category}</h2>
              <Checkbox
                options={menuOptions[category]}
                state={available}
                setState={setAvailable}
                name={category}
                className='divCheckbox'
              />
            </div>
          </Grid>
        )}
      </div>}
    </DivDailyMenu>
  )
}

export default DailyMenu;