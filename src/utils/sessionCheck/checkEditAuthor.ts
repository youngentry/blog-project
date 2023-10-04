import { getServerSession } from "next-auth";
import { checkBlogAdmin } from "./checkBlogAdmin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://blog-project-rose.vercel.app/";

// 게시글 수정 권한이 있는지 확인합니다.
export const checkEditAuthor = async (postId: string) => {
  // 게시글을 작성한 유저를 확인합니다.
  const result = await fetch(`${baseUrl}/posts/${postId}`, { method: "GET" });
  const jsonData = await result.json();
  const postEmail = jsonData.email;

  // 로그인한 유저를 확인합니다.
  const token = await getServerSession(authOptions);
  const userEmail = token?.user?.email;

  // 접속 권한을 확인합니다.
  const isBlogAdmin = checkBlogAdmin(userEmail as string);
  const canEdit: boolean = postEmail === userEmail || isBlogAdmin;

  return canEdit;
};
