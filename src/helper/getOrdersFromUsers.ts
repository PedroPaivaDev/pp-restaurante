export default function getOrdersFromUsers(customers:UsersDB) {
  let usersOrders:{[key:string]:UserOrder} = {}
  customers && Object.keys(customers).forEach(customer => {
    if(customers[customer].userOrders) {
      Object.keys(customers[customer].userOrders).forEach(orderUUID => {
        usersOrders = {
          ...usersOrders,
          [orderUUID]: customers[customer].userOrders[orderUUID]
        }
      })
    }
  });
  return usersOrders;
}