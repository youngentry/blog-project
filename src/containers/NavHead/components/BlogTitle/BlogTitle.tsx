import React from "react";
import styles from "./BlogTitle.module.scss";

/**
 * 상단 네비게이션 블로그 타이틀입니다.
 */
const BlogTitle = () => {
  return (
    <div className={styles.blogTitle}>
      <h2>{`Youngentry's Blog`}</h2>
    </div>
  );
};

export default BlogTitle;
