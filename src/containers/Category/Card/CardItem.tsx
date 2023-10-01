import styles from "./CardItem.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";

// category (게시물 목록)페이지에서 하나의 게시물 카드입니다.
const CardItem = ({ data }: { data: Card }) => {
  let { id, src, title, subtitle, commentCount, likes, author, date } = data;
  date = getDateForm(date);
  const link = `/posts/${id}`;

  return (
    <li className={styles.card}>
      <Link prefetch={false} href={link}>
        <Image className={styles.image} src={src} alt={"post cover"} width={300} height={300 * 0.75} />
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link prefetch={false} href={link}>
            {title || "제목 없음"}
          </Link>
        </h3>
        <ul className={styles.subtitle}>
          <Link href={{ pathname: "/category", query: { subtitle } }}>
            <li className={styles.subtitle}>{subtitle}</li>
          </Link>
        </ul>
        <div className={styles.more}>
          <div className={styles.write}>
            <div className={styles.author}>{author}</div>
            <div className={styles.date}>{date}</div>
          </div>
          <div className={styles.counts}>
            <div className={styles.comments}>
              <i>💬</i>
              <p>{commentCount}</p>
            </div>
            <div className={styles.likes}>
              <i>❤</i>
              <p>{likes}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardItem;
