const transformPadUnit = (unit: number) => {
  return unit.toString().padStart(2, '0');
};

/**
 * date를 YYYY.MM.DD 형태로 가공하여 반환합니다.
 * 두번째 인자를 true로 하면 시간을 포함한 형태를 반환합니다.
 * @param date
 * @param time
 * @returns
 */
export const getDateForm = (date: Date | string, time: boolean = false) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = transformPadUnit(dateObj.getMonth() + 1);
  const day = transformPadUnit(dateObj.getDate());
  const hour = transformPadUnit(dateObj.getHours());
  const minute = transformPadUnit(dateObj.getMinutes());
  const second = transformPadUnit(dateObj.getSeconds());

  return time ? `${year}.${month}.${day} ${hour}:${minute}:${second}` : `${year}.${month}.${day}`;
};
