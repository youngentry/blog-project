import { connectDB } from "@/utils/db/db";
import { JWT, getToken } from "next-auth/jwt";

// 댓글 정보를 불러오는 API입니다.
const handler = async (req: any, res: any) => {
  //   const { postId } = req.query;
  console.log(req.method);
  console.log(req.body);
  const token: JWT | null = await getToken({ req });
  console.log(token);
  if (req.method === "POST") {
    const db = (await connectDB).db("blog");
    const commentsCollection = db.collection("comments");

    const { nickname, userPassword, comment, postId } = req.body;

    const saveData = {
      parent: Number(postId),
      nickname: token ? token.name : nickname,
      author: token ? token.email : "",
      password: token ? "" : userPassword,
      comment,
      date: new Date(),
      thumbnail: "",
      isLoggedIn: token ? true : false,
    };

    const insertResult = await commentsCollection.insertOne({ ...saveData });

    if (insertResult) {
      return res.status(200).json({ message: "댓글 작성 완료" });
    }
    return res.status(404).json({ message: "Not found any post" });
  }
};

export default handler;
