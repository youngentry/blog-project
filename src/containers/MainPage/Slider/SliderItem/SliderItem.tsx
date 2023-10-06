import React from "react";
import styles from "./SliderItem.module.scss";
import { SlideItemProps } from "../Slider";
import Image from "next/image";
import Link from "next/link";

const SliderItem = ({ slideItemProps }: { slideItemProps: SlideItemProps }) => {
  const { title, src, content, link } = slideItemProps;
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <Image className={styles.image} src={src} alt={`post image`} fill />
      </div>
      <div className={styles.contentsBox}>
        <div className={styles.contents}>
          <Link className={styles.linkButton} href={link} target="_blank" rel="noopener noreferrer">
            <h3 className={styles.title}>{title}</h3>
          </Link>
          <p className={styles.content}>{content}</p>
          <div className={styles.linkBox}>
            <Link className={styles.linkButton} href={link} target="_blank" rel="noopener noreferrer">
              게시물 읽기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
