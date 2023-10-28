export const getKrTime = (date: Date) => {
  const difference = 1000 * 60 * 60 * 9;
  const krTime = new Date(new Date(date).getTime() + difference);

  return krTime.toISOString().replace('T', ' ').split('.')[0];
};
