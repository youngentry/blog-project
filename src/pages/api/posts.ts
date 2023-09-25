import { Card, Post } from "@/types/post";
import { connectDB } from "@/utils/db/db";

// 게시물 정보를 불러오는 API입니다.
const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    const db = (await connectDB).db("blog");
    const postCollection = db.collection<Post>("posts");
    // card에 불필요한 데이터는 제외합니다.
    const cardsData: Card[] = await postCollection
      .find({}, { projection: { email: 0, content: 0, _id: 0 } })
      .toArray();

    if (cardsData) {
      return res.status(200).json(cardsData);
    }

    return res.status(500).json({ message: "Not found any post: server error" });
  }
};

export default handler;
