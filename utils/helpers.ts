export const isoStringToDate = (date: string) => {
  const newDate = new Date(date);
  const month =
    newDate.getMonth() > 9 ? newDate.getMonth() : `0${newDate.getMonth()}`;
  const day = newDate.getDay() > 9 ? newDate.getDay() : `0${newDate.getDay()}`;
  const hours =
    newDate.getHours() > 9 ? newDate.getHours() : `0${newDate.getHours()}`;
  const minutes =
    newDate.getMinutes() > 9
      ? newDate.getMinutes()
      : `0${newDate.getMinutes()}`;

  return `${newDate.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
};
