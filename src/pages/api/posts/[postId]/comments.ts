import { CommentsForm, Comments } from "@/types/post";
import { connectDB } from "@/utils/db/db";
import { ObjectId } from "mongodb";
import { JWT, getToken } from "next-auth/jwt";
import { hash } from "bcrypt";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";

// 댓글 정보를 불러오는 API입니다.
const handler = async (req: any, res: any) => {
  let { postId }: { postId: string } = req.query;
  const token: JWT | null = await getToken({ req }); // 유저 정보

  // DB에 연결합니다.
  const db = (await connectDB).db("blog");
  const commentsCollection = db.collection<Comments>("comments");

  // 댓글 조회 요청
  if (req.method === "GET") {
    const foundCommentsResult = await commentsCollection
      .find({ parentId: Number(postId) }, { projection: { password: 0, parentId: 0 } })
      .toArray();

    res.status(200).json({ comments: foundCommentsResult });
  }

  // 댓글 작성 요청
  if (req.method === "POST") {
    let { nickname, password, comment }: CommentsForm = req.body;

    // nickname또는 password를 입력했는지 검사합니다.
    if (!token && (nickname.length < 1 || password.length < 1)) {
      return res.status(400).json({ message: "닉네임 또는 비밀번호를 입력해야합니다." });
    }

    // comment를 입력했는지 검사합니다.
    if (comment.length < 1) {
      return res.status(400).json({ message: "댓글을 입력해야합니다." });
    }

    const hashedPassword: string = await hash(password, 10);

    // DB에 저장할 데이터
    const saveData: Comments = {
      parentId: Number(postId),
      nickname: token ? (token.name as string) : nickname,
      author: token ? (token.email as string) : "",
      password: token ? "" : hashedPassword,
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

  // 댓글 수정 요청
  if (req.method === "PATCH") {
    console.log(req.method);
    const _id = new ObjectId(req.query._id);
    const { comment }: { comment: string } = req.body;

    // DB에서 댓글 작성자 정보 확인
    const foundResult = await commentsCollection.findOne({ _id });

    // 삭제할 댓글이 DB에 존재하지 않을 경우
    if (!foundResult) {
      return res.status(404).json({ message: "Not found any comment" });
    }

    // 로그인 유저일 경우 블로그 관리자가 아니거나, 동일한 작성자가 아닐 경우 400 응답
    if (token) {
      const isBlogAdmin = checkBlogAdmin(token.email as string);
      const isSameAuthor = token.email === foundResult.author;
      if (!isBlogAdmin && !isSameAuthor) {
        return res.status(400).json({ message: "수정 권한이 없습니다." });
      }
    }

    // 수정 요청 결과
    const editResult = await commentsCollection.updateOne({ _id }, { $set: { comment } });

    // 결과 응답
    if (editResult) {
      return res.status(200).json({ message: "댓글이 수정되었습니다." });
    }
  }

  // 댓글 삭제 요청
  if (req.method === "DELETE") {
    const _id = new ObjectId(req.query._id);

    // DB에서 댓글 작성자 정보 확인
    const foundResult = await commentsCollection.findOne({ _id });

    // 삭제할 댓글이 DB에 존재하지 않을 경우
    if (!foundResult) {
      return res.status(404).json({ message: "Not found any comment" });
    }

    // 로그인 유저일 경우 블로그 관리자가 아니거나, 동일한 작성자가 아닐 경우 400 응답
    if (token) {
      const isBlogAdmin = checkBlogAdmin(token.email as string);
      const isSameAuthor = token.email === foundResult.author;
      if (!isBlogAdmin && !isSameAuthor) {
        return res.status(400).json({ message: "수정 권한이 없습니다." });
      }
    }

    // 삭제 요청 결과
    const deleteResult = await commentsCollection.deleteOne({ _id });

    // 결과 응답
    if (deleteResult) {
      return res.status(200).json({ message: "댓글이 삭제되었습니다." });
    }
  }
};

export default handler;
