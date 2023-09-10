import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";

interface card {
  id: number;
  link: string;
  src: string;
  title: string;
  subtitles: string[];
  languages: string[];
  commentCount: number;
  likes: number;
}

const Card = ({ data }: { data: card }) => {
  const { id, link, src, title, subtitles, languages, commentCount, likes } = data;
  return (
    <div className={styles.card}>
      <a href={link} style={{ width: "100%", height: "100%" }}>
        <Image
          className={styles.image}
          src={src}
          alt={"post cover"}
          width={300}
          height={300 * 0.625}
          layout="intrinsic"
        />
      </a>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <a href={link}>{title}</a>
        </h3>
        <ul className={styles.subtitles}>
          {subtitles.map((subtitle) => {
            return (
              <li className={styles.subtitle} key={subtitle}>
                {subtitle}
              </li>
            );
          })}
        </ul>
        <ul className={styles.languages}>
          {languages.map((language) => {
            return (
              <li className={styles.subtitle} key={language}>
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
