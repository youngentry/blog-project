import Editor from "@/containers/Editor/Editor";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";
import { getServerSession } from "next-auth";

// 게시물 수정 페이지로 라우트합니다.
// 라우트 전 수정 권한 검사를 server에서 합니다.
const EditPostRouter = async ({ params }: any) => {
  // 수정 권한 확인
  const canEdit: boolean = await checkEditAuthor(params.postId);

  return (
    <div>
      <Editor postId={params.postId} canEdit={canEdit} />
    </div>
  );
};

const checkEditAuthor = async (postId: string) => {
  // 게시글을 작성한 유저를 확인합니다.
  const result = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "GET",
  });
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

export default EditPostRouter;
