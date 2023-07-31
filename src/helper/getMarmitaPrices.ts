export default function getMarmitaPrices(size:'Marmitinha'|'Marmitex', menuPrices:MenuPrices): number {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return menuPrices.weekend[size];
  } else {
    return  menuPrices.week[size];
  }
}