import { connectDB } from "@/utils/db/db";
import { getToken } from "next-auth/jwt";

// 새로운 게시물 작성 API 입니다.
const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    // DB와 Collection 연결
    const db = (await connectDB).db("blog");
    const postCollection = await db.collection("posts");
    const countersCollection = await db.collection("counters");

    // 게시물 작성자 정보
    const token = await getToken({ req });

    // 게시물 번호 정보 업데이트하기
    const currentCounter = await countersCollection.findOne({ model: "posts" });
    await countersCollection.findOneAndUpdate(
      { model: "posts" },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    const { title, subtitles, contents, src } = req.body; // 게시물 내용
    const id = currentCounter ? currentCounter.count + 1 : 1; // 게시물 번호
    const email = token?.email; // 작성자 email
    const author = token?.name; // 작성자 닉네임
    const date = new Date(); // 게시물 작성 시점
    const commentCount = 0; // 댓글
    const likes = 0; // 좋아요

    const saveData = {
      id,
      title,
      subtitles: subtitles.split(" "),
      contents,
      email,
      src: src || "https://cdn.pixabay.com/photo/2023/09/03/11/13/mountains-8230502_1280.jpg",
      author,
      date,
      commentCount,
      likes,
    };

    const result = await postCollection.insertOne({ ...saveData }); // DB에 저장한 결과

    return res.status(200).json({ id }); // 응답에 새 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
};

export default handler;
