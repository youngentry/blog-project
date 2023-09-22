import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";

// category (게시물 목록)페이지에서 하나의 게시물 카드입니다.
const Card = ({ data }: { data: Post }) => {
  const { id, src, title, subtitles, languages, commentCount, likes, author, date } = data;

  const link = `/posts/${id}`;

  return (
    <div className={styles.card}>
      <Link prefetch={false} href={link}>
        <Image className={styles.image} src={src} alt={"post cover"} width={300} height={300 * 0.75} />
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link prefetch={false} href={link}>
            {title ? title : "제목 없음"}
          </Link>
        </h3>
        <ul className={styles.subtitles}>
          {subtitles.map((subtitle, index) => {
            if (subtitles.length === 1 && !subtitle) {
              return (
                <li className={styles.subtitle} key={index}>
                  #부제목없음
                </li>
              );
            }
            if (subtitle) {
              return (
                <li className={styles.subtitle} key={index}>
                  #{subtitle}
                </li>
              );
            }
          })}
        </ul>
        <div className={styles.more}>
          <div className={styles.write}>
            <div className={styles.author}>{author}</div>
            <div className={styles.date}>{getDateForm(date)}</div>
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
    </div>
  );
};

export default Card;
