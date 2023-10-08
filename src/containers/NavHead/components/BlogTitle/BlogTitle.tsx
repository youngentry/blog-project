import React from "react";
import styles from "./BlogTitle.module.scss";
import Link from "next/link";

/**
 * 상단 네비게이션 블로그 타이틀입니다.
 */
const BlogTitle = () => {
  return (
    <div className={styles.blogTitle}>
      <Link href={"/"}>
        <h2>{`Youngentry's Blog`}</h2>
      </Link>
    </div>
  );
};

export default BlogTitle;
