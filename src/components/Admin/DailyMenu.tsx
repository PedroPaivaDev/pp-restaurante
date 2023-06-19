import React from 'react';
import styled from 'styled-components';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

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

interface DailyMenu {
  [key:string]: string[];
}

const DailyMenu = () => {
  const {userDB} = React.useContext(AuthGoogleContext);
  const [menu, setMenu] = React.useState<Menu>();
  const [menuOptionsIds, setMenuOptionsIds] = React.useState<DailyMenu|null>(null);
  const [available, setAvailable] = React.useState<string[]>([]);

  function getMenuProductsByCategories(menuProducts:MenuProducts):DailyMenu {
    let portionsByCategory:DailyMenu = {};
    Object.keys(menuProducts).forEach(category =>
      Object.keys(menuProducts[category].products).forEach(type =>
        Object.keys(menuProducts[category].products[type].products).forEach(portion => {
          if(portionsByCategory[category]) {
            portionsByCategory = {
              ...portionsByCategory,
              [category]: [
                ...portionsByCategory[category],
                `${menuProducts[category].products[type].products[portion].id}`
              ]
            }
          } else {
            portionsByCategory = {
              ...portionsByCategory,
              [category]: [
                `${menuProducts[category].products[type].products[portion].id}`
              ]
            }
          }
        })
      )
    )
    return portionsByCategory
  }

  function getAllProductsInCategories(menuProducts:MenuProducts):string[] {
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

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[]);

  React.useEffect(() => {
    menu && setMenuOptionsIds(getMenuProductsByCategories(menu.products))
  },[menu])

  React.useEffect(() => {
    menu && menuOptionsIds && setAvailable(getAllProductsInCategories(menu?.products));
  },[menu, menuOptionsIds])

  return (
    <DivDailyMenu className='envelope animeLeft'>
      <h1>Cardápio do Dia</h1>
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
                admin={userDB?.userData.admin}
              />
            </div>
          </Grid>
        )}
      </div>}
    </DivDailyMenu>
  )
}

export default DailyMenu;