//returns 'true' if the timestamp is greater than the closing time of the other day
export default function getDiffTimestamp(creationTime:number, closeHour:number) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const yesterdayDeliveryCloseHour = closeHour;
  const yesterdayDeliveryCloseDate = new Date(year, month, (day - 1));
  const referenceYesterdayDateHour = new Date(
    yesterdayDeliveryCloseDate.getFullYear(),
    yesterdayDeliveryCloseDate.getMonth(),
    yesterdayDeliveryCloseDate.getDate(),
    yesterdayDeliveryCloseHour
  );
  const referenceYesterdayTimestamp = referenceYesterdayDateHour.getTime();
  if(creationTime > referenceYesterdayTimestamp) {
    return true;
  } else {
    return false;
  }
}