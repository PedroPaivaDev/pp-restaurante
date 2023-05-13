export default function getPortions(marmita:ObjectWithStringArrays) {
  const portions = Object.values(marmita);
  const arrayPortions:string[] = [];
  portions.forEach(portion => arrayPortions.push(...portion))
  return arrayPortions;
}