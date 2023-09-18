/**
 * 블로그 관리 권한이 있는 계정인지 확인합니다.
 * @param session
 * @returns boolean
 */
export const isBlogAdmin = (email: string) => {
  const admins: string[] | undefined = process.env.NEXT_PUBLIC_BLOG_ADMIN?.split(","); // blog manager emails: string[]

  console.log(admins);
  console.log(email);
  // 로그인된 유저의 email이 managers에 포함될 경우 true를 반환합니다.
  if (email && admins) {
    return admins.includes(email);
  }

  return false;
};
