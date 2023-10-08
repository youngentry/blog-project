import React from "react";
import styles from "./LikedPostItem.module.scss";

const LikedPostItem = () => {
  return (
    <li className={styles.container}>
      <div className={styles.itemHead}>
        <h3 className={styles.author}>작성자 이름</h3>
        <button className={styles.deleteLikeButton}>삭제하기</button>
      </div>
      <div className={styles.itemBody}>
        <div className={styles.description}>
          <p className={styles.title}>게시글 제목</p>
          <div className={styles.postImage}>대표이미지</div>
        </div>
        <p className={styles.time}>시간</p>
      </div>
    </li>
  );
};

export default LikedPostItem;
