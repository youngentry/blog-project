import { connectDB } from "@/utils/db/db";

const Home = async () => {
  const db = (await connectDB).db("blog");
  let result = await db.collection("post").find().toArray();
  console.log(result);
  return <div>메인</div>;
};

export default Home;
