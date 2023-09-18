import Editor from "@/containers/Editor/Editor";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";
import { getServerSession } from "next-auth";

const EditPostRouter = async ({ params }: any) => {
  const canEdit: boolean = await checkEditAuthor(params.postId); // 수정 권한 확인

  return (
    <div>
      <Editor postId={params.postId} canEdit={canEdit} />
    </div>
  );
};

const checkEditAuthor = async (postId: string) => {
  // 게시글을 작성한 유저를 확인합니다.
  const result = await fetch(`http://localhost:3000/api/manage/newpost/${postId}`, {
    method: "GET",
    cache: "force-cache",
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
