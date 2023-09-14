/**
 * 블로그 관리 권한이 있는 계정인지 확인합니다.
 * @param session
 * @returns boolean
 */
export const isBlogMaster = (session: UserSessionData) => {
  const sessionEmail: string | undefined = session?.user?.email; // 로그인된 유저의 email
  const managers: string[] | undefined = process.env.NEXT_PUBLIC_BLOG_MASTER?.split(","); // blog manager emails: string[]

  // 로그인된 유저의 email이 managers에 포함될 경우 true를 반환합니다.
  if (sessionEmail && managers) {
    return managers.includes(sessionEmail);
  }

  return false;
};
