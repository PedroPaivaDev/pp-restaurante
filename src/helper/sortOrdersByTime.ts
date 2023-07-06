export default function sortOrdersByTime(userOrders:UserOrders, ascending?:boolean): UserOrder[] {

  const sortedEntries = Object.values(userOrders).sort((a, b) => {
      if (ascending) {
        return a.orderTime - b.orderTime;
      } else {
        return b.orderTime - a.orderTime;
      }
    }
  );

  return sortedEntries;
}