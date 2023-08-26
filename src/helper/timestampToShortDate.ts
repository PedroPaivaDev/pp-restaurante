export default function timestampToShortDate(timestamp: number): string {
  const date = new Date(timestamp);
  const weekDay = getWeekDay(date.getDay());
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${weekDay}_%0a${day}/${month}/${year}`;
}

function getWeekDay(day: number): string {
  const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return weekDays[day];
}