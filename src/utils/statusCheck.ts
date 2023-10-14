/**
 * 통신 status가 200대인지 확인합니다.
 * @param status
 * @returns
 */
export const statusCheck = (status: number) => {
  return Math.floor(status / 100) === 2;
};
