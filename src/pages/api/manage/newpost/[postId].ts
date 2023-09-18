import { connectDB } from "@/utils/db/db";

const handler = async (req: any, res: any) => {
  const { postId } = req.query;

  if (req.method === "GET") {
    const db = (await connectDB).db("blog");
    const postCollection = await db.collection("posts");
    const post = await postCollection.findOne({ id: Number(postId) });

    if (post) {
      const { title, subtitles, contents, email } = post;
      return res.status(200).json({ title, subtitles, contents, email });
    }

    return res.status(404).json({ message: "Not found any post" });
  }

  if (req.method === "POST") {
    // DB와 Collection 연결
    const db = (await connectDB).db("blog");
    const postCollection = await db.collection("posts");

    // 게시물 작성자 정보
    const { title, subtitles, contents, id } = req.body; // 게시물 내용

    const saveData = {
      title,
      subtitles: subtitles.split(" "),
      contents,
    };

    const result = await postCollection.updateOne({ id: Number(id) }, { $set: { ...saveData } }); // DB에 저장한 결과

    return res.status(200).json({ id }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
};

export default handler;
