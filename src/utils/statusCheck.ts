export const statusCheck = (status: number) => {
  return ~~(status / 100) === 2;
};
