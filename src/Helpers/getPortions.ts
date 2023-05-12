export default function getPortions(marmita:Marmita) {
  const portions = Object.values(marmita);
  const arrayPortions:string[] = [];
  portions.forEach(portion => arrayPortions.push(...portion))
  return arrayPortions;
}