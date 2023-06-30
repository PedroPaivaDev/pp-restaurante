import getDiffTimestamp from "./getDiffTimestamp";

export default function getOrdersOfTheDay(userOrders:UserOrders) {
  let ordersOfTheDay:UserOrders = {};
  Object.keys(userOrders).filter(orderId =>
    getDiffTimestamp(userOrders[orderId].orderTime, 15)
  ).forEach(dayOrderId =>
    ordersOfTheDay = {
      ...ordersOfTheDay,
      [dayOrderId]: userOrders[dayOrderId]
    }
  )
  return ordersOfTheDay;
}