/**
 * 관리자 권한이 있는 계정인지 확인합니다.
 * @param session
 * @returns boolean
 */
export const checkBlogAdmin = (role: string | null | undefined): boolean => {
  return role === 'admin';
};
