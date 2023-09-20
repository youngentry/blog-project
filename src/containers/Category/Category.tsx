import { connectDB } from "@/utils/db/db";
import Card from "./Card/Card";
import styles from "./Category.module.scss";
import Pagination from "@/components/Pagination/Pagination";
import { Post } from "@/types/post";

// category (게시물 목록)페이지입니다.
// 게시물 카드를 map으로 렌더링 하고, 각각의 게시물 카드에는 게시물 데이터를 props 전달합니다.
const Category = async () => {
  const db = (await connectDB).db("blog");
  const postCollection = db.collection<Post>("posts");
  // _id 필드는 노출되지 않는 것이 좋습니다. content 필드는 제외하고 도큐먼트를 불러옴으로써 card에 불필요한 데이터는 제외합니다.
  const postData: Post[] = await postCollection
    .find({}, { projection: { content: 0, _id: 0 } })
    .toArray();

  return (
    <div className={styles.category}>
      <h2>전체 게시물</h2>
      <div className={styles.cardContainer}>
        {postData.map((data: Post) => {
          return <Card key={data.id} data={data} />;
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default Category;
