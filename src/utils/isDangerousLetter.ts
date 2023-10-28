// NoSQL injection 방어
export const isDangerousLetter = (inputValue: string) => {
  const regEx = /[${}[\]().]/;
  if (regEx.test(inputValue)) {
    return true;
  }
  return false;
};
