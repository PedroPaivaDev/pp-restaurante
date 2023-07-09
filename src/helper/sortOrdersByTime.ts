export default function sortOrdersByTime(userOrders:UserOrders, sequence:string): UserOrder[] {

  const statusNumber:{[key:string]:number} = {
    pendente: 1,
    preparo: 2,
    entrega: 3,
    concluido: 4,
    cancelado: 5
  }

  const sortedEntries = Object.values(userOrders).sort((a, b) => {
      if (sequence==='ascending') {
        return a.orderTime - b.orderTime;
      } else if(sequence==='descending') {
        return b.orderTime - a.orderTime;
      } else {
        return statusNumber[a.status] - statusNumber[b.status];
      }
    }
  );

  return sortedEntries;
}