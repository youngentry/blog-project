import { connectDB } from "@/utils/db/db";

// 게시물 정보를 불러오는 API입니다.
const handler = async (req: any, res: any) => {
  const { postId } = req.query;
  if (req.method === "GET") {
    const db = (await connectDB).db("blog");
    const postCollection = await db.collection("posts");
    const post = await postCollection.findOne({ id: Number(postId) });

    if (post) {
      const { id, title, subtitles, contents, email, src, author, date, commentCount, likes } = post;
      return res
        .status(200)
        .json({ id, title, subtitles, contents, email, src, author, date, commentCount, likes });
    }

    return res.status(404).json({ message: "Not found any post" });
  }
};

export default handler;
