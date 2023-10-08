import React from "react";
import styles from "./Likes.module.scss";
import LikedPostItem from "./components/LikedPostItem/LikedPostItem";

const Likes = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.dates}>
        <li className={styles.oneDate}>
          <div className={styles.likedDate}>오늘</div>
          <ul className={styles.postList}>
            <LikedPostItem />
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Likes;
