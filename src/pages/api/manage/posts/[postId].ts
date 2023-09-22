import { connectDB } from "@/utils/db/db";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";
import { JWT, getToken } from "next-auth/jwt";

// 새로운 게시물 작성 API 입니다.
const handler = async (req: any, res: any) => {
  if (req.method === "DELETE") {
    // 게시물 번호
    const { postId } = req.query;

    // 로그인 유저정보 확인
    const token: JWT | null = await getToken({ req });
    if (!token) {
      return res.status(400).json({ message: "로그인 되지 않은 유저입니다." });
    }

    const userEmail = token.email as string; // 로그인 유저 email
    // DB와 Collection 연결
    const db = (await connectDB).db("blog");
    const postCollection = await db.collection("posts");

    const foundPost = await postCollection.findOne({ id: Number(postId) });
    const postAuthorEmail = foundPost?.email;
    const isBlogAdmin = checkBlogAdmin(userEmail);
    // 로그인 유저와 게시글 작성자가 다른지 확인 && 블로그 관리자가 아닌지 확인
    if (userEmail !== postAuthorEmail && !isBlogAdmin) {
      return res.status(400).json({ message: "유효한 접근이 아닙니다." });
    }

    // 삭제 결과
    const result = await postCollection.deleteOne({ id: Number(postId) });

    if (result) {
      return res.status(200).json({ message: "삭제가 되었습니다." }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
    }

    return res.status(500).json({ message: "서버 문제로 삭제 실패했습니다." }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
};

export default handler;
