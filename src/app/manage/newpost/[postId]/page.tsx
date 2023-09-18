import Editor from "@/containers/Editor/Editor";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";
import axios from "axios";
import { getServerSession } from "next-auth";

const EditPostRouter = async ({ params }: any) => {
  // 게시글을 작성한 유저를 확인합니다.
  const result = await axios.get(`http://localhost:3000/api/manage/newpost/${params.postId}`);
  const postEmail = result.data.email;

  // 로그인한 유저를 확인합니다.
  const token = await getServerSession(authOptions);
  const userEmail = token?.user?.email;

  // 접속 권한을 확인합니다.
  const isBlogAdmin = checkBlogAdmin(userEmail as string);
  const canEdit: boolean = postEmail === userEmail || isBlogAdmin;

  return (
    <div>
      <Editor postId={params.postId} canEdit={canEdit} />
    </div>
  );
};

export default EditPostRouter;
