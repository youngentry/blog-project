import { checkIsBlogAdmin } from './checkUserRole';

interface CheckIsSameAuthor {
  (userRole: string | null | undefined, userEmail: string, postAuthor: string): boolean;
}

/**
 * 동일한 게시물을 작성한 계정인지 확인합니다.
 * @param email
 * @returns boolean
 */
export const checkIsSameAuthor: CheckIsSameAuthor = (userRole, userEmail, postAuthor) => {
  // 로그인 상태 확인
  if (!userEmail) {
    return false;
  }

  // 로그인된 유저의 email과 게시물의 email이 동일한 경우 또는 admin일 경우 true를 반환합니다.
  if (userEmail) {
    const isBlogAdmin: boolean = checkIsBlogAdmin(userRole);
    if (userEmail === postAuthor || isBlogAdmin) {
      return true;
    }
  }

  return false;
};
