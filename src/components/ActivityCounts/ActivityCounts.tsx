import React from "react";
import styles from "./ActivityCounts.module.scss";

const ActivityCounts = ({ postCommentCount, likes }: { postCommentCount: number; likes: number }) => {
  return (
    <div className={styles.counts}>
      <div>💬 {postCommentCount}</div>
      <div>❤ {likes}</div>
    </div>
  );
};

export default ActivityCounts;
