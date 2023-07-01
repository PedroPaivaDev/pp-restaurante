import splitPortionId from "./splitPortionId";

export default function getNameById(id:string, menuProducts:MenuProducts) {
  const { category, type } = splitPortionId(id);
  return menuProducts[category].products[type].products[id].name
}