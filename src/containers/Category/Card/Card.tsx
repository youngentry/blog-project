import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";

const Card = ({ data }: { data: Post }) => {
  const { id, src, title, subtitles, languages, commentCount, likes, author, date } = data;

  const link = `/post/${id}`;

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
        {/* <ul className={styles.languages}>
          {languages.map((language, index) => {
            if (languages.length === 1 && !languages) {
              return (
                <li className={styles.subtitle} key={index}>
                  #언어선택없음
                </li>
              );
            }
            return (
              <li className={styles.subtitle} key={index}>
                #{language}
              </li>
            );
          })}
        </ul> */}
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
