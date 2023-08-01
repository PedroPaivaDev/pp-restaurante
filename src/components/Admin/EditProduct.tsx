import React from 'react';
import styled from 'styled-components';

import { changeSizesPrices, getData } from '@/services/firebase';
import getMenuProductsIdsByCategories from '@/helper/getMenuProductsIdsByCategories';
import splitPortionId from '@/helper/splitPortionId';

import InputText from '../Forms/InputText';
import Grid from '../Grid';
import PortionAdmin from './PortionAdmin';
import Button from '../Forms/Button';

const DivSizesPrices = styled.form`
  gap: 20px;
  .partsOfTheWeek {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    .sizePrices {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
  @media (max-width:640px) {
    .partsOfTheWeek {
      flex-direction: column;
      gap: 20px;
    }
  }
`;

const EditProduct = () => {
  const [menu, setMenu] = React.useState<Menu|null>(null);
  const [products, setProducts] = React.useState<ObjectArrayString|null>(null);

  function createObjectFromEntries(entriesArray:Array<[string, string]>, menu:Menu) {
    let objectWithEntries:MenuPrices = {
      week: {
        Marmitex: menu.prices.week.Marmitex,
        Marmitinha: menu.prices.week.Marmitinha
      },
      weekend: {
        Marmitex: menu.prices.weekend.Marmitex,
        Marmitinha: menu.prices.weekend.Marmitinha
      }
    };
    entriesArray.forEach(entry => {
      if(entry[1] !== '') {
        const partWeek = entry[0].split('-')[0] as PartOfTheWeek;
        const size = entry[0].split('-')[1] as MarmitaSizes;
        objectWithEntries = {
          ...objectWithEntries,
          [partWeek]: {
            ...objectWithEntries[partWeek],
            [size]: Number(entry[1])
          }
        }
      }
    });
    return objectWithEntries;
  }

  function handleChangePrices(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataEntriesArray = Array.from(formData.entries());
    const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>,menu as Menu);

    changeSizesPrices(formObjectChangedKeys).then(() => {
      getData<Menu|null>('cardapio', setMenu);
      alert('preços alterados')
    });
  }

  React.useEffect(() => {
    getData<Menu|null>('cardapio', setMenu)
  },[]);  

  React.useEffect(() => {
    menu && setProducts(getMenuProductsIdsByCategories(menu.products))
  },[menu])

  return (
    <div>
      <h1>Editar Produtos</h1>
      <DivSizesPrices className='wrapper' onSubmit={handleChangePrices}>
        <div className='partsOfTheWeek'>
          <div className='sizePrices'>
            <h2>Preços Durante a Semana:</h2>
            <InputText placeholder={`${menu?.prices.week.Marmitinha}`}
              label='Marmitinha' type="text" name="week-Marmitinha"
            />
            <InputText placeholder={`${menu?.prices.week.Marmitex}`}
              label='Marmitex' type="text" name="week-Marmitex"
            />
          </div>
          <div className='sizePrices'>
            <h2>Preços do Final de Semana:</h2>
            <InputText placeholder={`${menu?.prices.weekend.Marmitinha}`}
              label='Marmitinha' type="text" name="weekend-Marmitinha"
            />
            <InputText placeholder={`${menu?.prices.weekend.Marmitex}`}
              label='Marmitex' type="text" name="weekend-Marmitex"
            />
          </div>
        </div>
        <Button label='Alterar Preços'/>
      </DivSizesPrices>
      {products && menu &&
        <div className='envelope animeLeft'>
          {Object.keys(products).map(category =>
            <div key={category} className='wrapper'>
              <h2>{category.toUpperCase()}</h2>
              <div className='row'>
                {products[category].map(id =>
                  <Grid key={id}
                    xs={12} sm={6} md={4} lg={3}
                  >
                    <PortionAdmin
                      ingredient={menu.products[category].products[splitPortionId(id).type].products[id]}
                    />
                  </Grid>
                )}
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default EditProduct;