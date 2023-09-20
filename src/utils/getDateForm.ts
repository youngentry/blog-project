// date를 YYYY.MM.DD 형태로 가공하여 반환합니다.
export const getDateForm = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};
