export default function getMenuProductsIdsByCategories(menuProducts:MenuProducts):ObjectArrayString {
  let portionsByCategory:ObjectArrayString = {};
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