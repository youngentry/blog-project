import React from "react";
import styles from "./SliderItem.module.scss";
import { SlideItemProps } from "../Slider/Slider";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRightSquare } from "react-icons/bs";

const SliderItem = ({ slideItemProps }: { slideItemProps: SlideItemProps }) => {
  const { title, src, content, link } = slideItemProps;
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <div className={styles.container}>
        <div className={styles.imageBox}>
          <Image className={styles.image} src={src} alt={`post image`} fill />
        </div>
        <div className={styles.contentsBox}>
          <div className={styles.contents}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{content}</p>
            <div className={styles.linkBox}>
              <p>게시물 보러가기</p>
              <BsArrowUpRightSquare />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SliderItem;
