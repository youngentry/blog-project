import { CommentsForm, Comments } from "@/types/post";
import { connectDB } from "@/utils/db/db";
import { JWT, getToken } from "next-auth/jwt";

// 댓글 정보를 불러오는 API입니다.
const handler = async (req: any, res: any) => {
  let { postId }: { postId: string } = req.query;
  const token: JWT | null = await getToken({ req }); // 유저 정보

  // DB에 연결합니다.
  const db = (await connectDB).db("blog");
  const commentsCollection = db.collection("comments");

  if (req.method === "GET") {
    const foundCommentsResult = await commentsCollection
      .find({ parentId: Number(postId) }, { projection: { password: 0, parentId: 0 } })
      .toArray();

    res.status(200).json({ comments: foundCommentsResult });
  }

  if (req.method === "POST") {
    const { nickname, password, comment }: CommentsForm = req.body;

    // nickname또는 password를 입력했는지 검사합니다.
    if (!token && (nickname.length < 1 || password.length < 1)) {
      return res.status(400).json({ message: "닉네임 또는 비밀번호를 입력해야합니다." });
    }

    // comment를 입력했는지 검사합니다.
    if (comment.length < 1) {
      return res.status(400).json({ message: "댓글을 입력해야합니다." });
    }

    // DB에 저장할 데이터
    const saveData: Comments = {
      parentId: Number(postId),
      nickname: token ? (token.name as string) : nickname,
      author: token ? (token.email as string) : "",
      password: token ? "" : password,
      comment,
      date: new Date(),
      thumbnail: "",
      isLoggedIn: token ? true : false,
    };

    // 댓글 작성 결과
    const insertResult = await commentsCollection.insertOne({ ...saveData });

    // 결과 응답
    if (insertResult) {
      return res.status(200).json({ message: "댓글 작성 완료" });
    }
    return res.status(404).json({ message: "Not found any post" });
  }
};

export default handler;
