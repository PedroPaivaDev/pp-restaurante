export default function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  return `${day} de ${month} de ${year} às ${timeString}`;
}