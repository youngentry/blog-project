import { connectDB } from "@/utils/db/db";

// 게시물 수정 API 입니다.
const handler = async (req: any, res: any) => {
  const { postId } = req.query;

  if (req.method === "POST") {
    // DB와 Collection 연결
    const db = (await connectDB).db("blog");
    const postCollection = await db.collection("posts");

    // 게시물 작성자 정보
    const { title, subtitles, contents } = req.body; // 게시물 내용

    const saveData = {
      title,
      subtitles: subtitles.split(" "),
      contents,
    };

    const result = await postCollection.updateOne({ id: Number(postId) }, { $set: { ...saveData } }); // DB에 저장한 결과

    return res.status(200).json({ id: postId }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
};

export default handler;
