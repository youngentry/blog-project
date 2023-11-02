/**
 * 관리자 권한이 있는 계정인지 확인합니다.
 * @param session
 * @returns boolean
 */
export const checkBlogAdmin = (email: string): boolean => {
  const admins: string[] | undefined = process.env.BLOG_ADMIN?.split(','); // blog manager emails: string[]

  // 로그인된 유저의 email이 admin에 포함될 경우 true를 반환합니다.
  if (email && admins) {
    return admins.includes(email);
  }

  return false;
};
