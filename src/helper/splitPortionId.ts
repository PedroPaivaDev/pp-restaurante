export default function splitPortionId(id:string) {
  const portionCategory = id.split('%')[0];
  const portionType = id.split('%')[1].split('_')[0];
  return {
    category: portionCategory,
    type: portionType
  };
}