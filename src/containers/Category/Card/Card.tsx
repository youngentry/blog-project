import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { card } from "@/types/post";

const Card = ({ data }: { data: card }) => {
  const { id, link, src, title, subtitles, languages, commentCount, likes } = data;
  return (
    <div className={styles.card}>
      <Link prefetch={false} href={link}>
        <Image className={styles.image} src={src} alt={"post cover"} width={300} height={300 * 0.75} />
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link prefetch={false} href={link}>
            {title}
          </Link>
        </h3>
        <ul className={styles.subtitles}>
          {subtitles.map((subtitle, index) => {
            return (
              <li className={styles.subtitle} key={index}>
                {subtitle}
              </li>
            );
          })}
        </ul>
        <ul className={styles.languages}>
          {languages.map((language, index) => {
            return (
              <li className={styles.subtitle} key={index}>
                {language}
              </li>
            );
          })}
        </ul>
        <div className={styles.more}>
          <div>
            <i>💬</i>
            <p>{commentCount}</p>
          </div>
          <div>
            <i>❤</i>
            <p>{likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
