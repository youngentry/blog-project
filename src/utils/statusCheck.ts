/**
 * 스테이터스 경고를 출력합니다.
 * @param {number} status 응답 상태 코드
 * @param {string} message 응답 메시지
 * @returns {true | undefined} 200대 코드인 경우 true 반환, error 코드인 경우 alert 출력
 */
export const statusCheck = (status: number, message: string = "") => {
  // 올바르게 동작하는 코드인 경우 true를 반환합니다.
  if (~~(status / 100) === 2) {
    return true;
  }

  // 경고 메시지를 출력하고 false를 반환합니다.
  window.alert(message);
  return false;
};
