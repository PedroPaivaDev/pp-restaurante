export default function getOrdersFromUsers(customers:UsersDB):UserOrders {
  let usersOrders:UserOrders = {}
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