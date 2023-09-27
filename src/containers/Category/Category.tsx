import CardItem from "./Card/CardItem";
import styles from "./Category.module.scss";
import Pagination from "@/components/Pagination/Pagination";
import { Card } from "@/types/post";
import { getCardsData } from "@/services/postsFetch";

// category (게시물 목록)페이지입니다.
// 게시물 카드를 map으로 렌더링 하고, 각각의 게시물 카드에는 게시물 데이터를 props 전달합니다.
const Category = async () => {
  const cardsData: Card[] | false = await getCardsData();

  // 요청한 카드 데이터가 없는 경우
  if (!cardsData) {
    return (
      <div className={styles.category}>
        <div>게시물이 존재하지 않습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <h2>전체 게시물</h2>
      <ul className={styles.cardContainer}>
        {cardsData.map((data: Card) => {
          return <CardItem key={data.id} data={data} />;
        })}
      </ul>
      <Pagination />
    </div>
  );
};

export default Category;
