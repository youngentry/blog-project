import { getServerSession } from "next-auth";
import { checkBlogAdmin } from "./checkBlogAdmin";

/**
 * 동일한 게시물을 작성한 계정인지 확인합니다.
 * @param email
 * @returns boolean
 */
export const isSameAuthor = async (email: string) => {
  const token = await getServerSession();

  // 토큰 유무 확인
  if (!token) {
    return false;
  }

  // 로그인된 유저의 email과 게시물의 email이 동일한 경우 또는 admin일 경우 true를 반환합니다.
  const user = token.user?.email;
  if (user) {
    const isBlogAdmin: boolean = checkBlogAdmin(user);
    if (user === email || isBlogAdmin) {
      return true;
    }
  }

  return false;
};
