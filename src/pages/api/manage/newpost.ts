import { connectDB } from "@/utils/db/db";
import { getToken } from "next-auth/jwt";

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    const db = (await connectDB).db("blog"); // DB에 비동기로 연결한 뒤 blog DB에 연결
    const postCollection = await db.collection("posts"); // post 콜렉션에 연결
    const countersCollection = await db.collection("counters"); // counters 콜렉션에 연결
    const token = await getToken({ req });

    const currentCounter = await countersCollection.findOne({ model: "posts" });
    await countersCollection.findOneAndUpdate(
      { model: "posts" },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    const { title, subtitles, languages, contents, src } = req.body;
    const email = token?.email;
    const author = token?.name;
    const date = new Date();
    const commentCount = 0;
    const likes = 0;
    const id = currentCounter ? currentCounter.count + 1 : 1;

    const saveData = {
      id,
      title,
      subtitles: subtitles.split(" "),
      languages: languages.split(" "),
      contents,
      email,
      src: src || "https://cdn.pixabay.com/photo/2023/09/03/11/13/mountains-8230502_1280.jpg",
      author,
      date,
      commentCount,
      likes,
    };

    const result = await postCollection.insertOne({ ...saveData });

    return res.status(200).json({ id });
  }
};

export default handler;
