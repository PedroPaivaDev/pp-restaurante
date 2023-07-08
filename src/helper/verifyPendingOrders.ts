import getDiffTimestamp from "./getDiffTimestamp";

export default function verifyPendingOrders(userOrders:UserOrders):UserOrders|null {
  let pendingOrdersObject:UserOrders = {};
  Object.keys(userOrders).filter(orderUuid => getDiffTimestamp(userOrders[orderUuid].orderTime,15)).forEach(orderUuid => {
    if(
      userOrders[orderUuid].status==='pendente' ||
      userOrders[orderUuid].status==='preparo' ||
      userOrders[orderUuid].status==='entrega'
    ) {
      pendingOrdersObject = {
        ...pendingOrdersObject,
        [orderUuid]: userOrders[orderUuid]
      }
    }
  });
  if(Object.keys(pendingOrdersObject).length>0) {
    return pendingOrdersObject;
  } else {
    return null;
  }
}