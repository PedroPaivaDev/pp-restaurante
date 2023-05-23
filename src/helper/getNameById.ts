export default function getNameById(marmita:MarmitaPortions, menuProducts:MenuProducts) {

  let newMarmita:MarmitaPortions = {};

  Object.keys(marmita).forEach(category => {
    marmita[category].forEach(portionId => {
      const portionType = portionId.split('-')[0];
      const portionName = menuProducts[category].products[portionType].products[portionId].name;
      if(Object.keys(newMarmita).includes(category)) {
        newMarmita = {
          ...newMarmita,
          [category]: [
            ...newMarmita[category],
            portionName
          ]
        }
      } else {
        newMarmita = {
          ...newMarmita,
          [category]: [
            portionName
          ]
        }
      }
    });
  });

  return newMarmita;
}