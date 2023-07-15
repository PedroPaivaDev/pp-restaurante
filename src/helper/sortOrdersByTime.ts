export default function sortOrdersByTime(userOrders:UserOrders, sequence:string): UserOrder[] {

  const statusNumber:{[key:string]:number} = {
    pendente: 1,
    preparo: 2,
    entrega: 3,
    concluido: 4,
    cancelado: 5
  }

  const sortedEntries = Object.values(userOrders).sort((a, b) => {
      if (sequence==='crescente') {
        return a.orderTime - b.orderTime;
      } else if(sequence==='decrescente') {
        return b.orderTime - a.orderTime;
      } else {
        return statusNumber[a.status] - statusNumber[b.status];
      }
    }
  );

  return sortedEntries;
}