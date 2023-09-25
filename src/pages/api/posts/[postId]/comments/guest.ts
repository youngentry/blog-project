import { CommentForm, Comment } from "@/types/post";
import { connectDB } from "@/utils/db/db";
import { ObjectId } from "mongodb";
import { JWT, getToken } from "next-auth/jwt";
import { compare, hash } from "bcrypt";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";

// 댓글 정보를 불러오는 API입니다.
const handler = async (req: any, res: any) => {
  let { _id }: { _id: string } = req.query;
  const { password } = req.body;

  try {
    // DB에 연결합니다.
    const db = (await connectDB).db("blog");
    const commentsCollection = db.collection<Comment>("comments");

    // 댓글 권한 조회
    if (req.method === "POST") {
      const foundComment = await commentsCollection.findOne({ _id: new ObjectId(_id) });

      // 찾는 댓글이 DB에 존재하지 않을 경우
      if (!foundComment) {
        return res.status(400).json({ message: "Not found any comment" });
      }

      const isValidPassword = await compare(password, foundComment.password);

      if (isValidPassword) {
        const deleteResult = await commentsCollection.deleteOne({ _id: new ObjectId(_id) });
        return res.status(200).json({ message: "게스트 권한 확인." });
      }

      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch {
    return res.status(500).json({ message: "서버 문제로 인해 처리하지 못했습니다." });
  }
};

export default handler;
