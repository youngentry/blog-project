/**
 * 게시글 작성 권한이 있는 계정인지 확인합니다.
 * @param session
 * @returns boolean
 */
export const isBlogManager = (email: string) => {
  const managers: string[] | undefined = process.env.NEXT_PUBLIC_BLOG_MANAGER?.split(","); // blog manager emails: string[]

  // 로그인된 유저의 email이 managers에 포함될 경우 true를 반환합니다.
  if (email && managers) {
    return managers.includes(email);
  }

  return false;
};
