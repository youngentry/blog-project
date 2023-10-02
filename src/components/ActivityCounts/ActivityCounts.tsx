import React from "react";
import styles from "./ActivityCounts.module.scss";
import LikePostButton from "../buttons/LikePostButton";

const ActivityCounts = ({
  postId,
  postCommentCount,
  likes,
  userEmail,
}: {
  postId: string;
  postCommentCount: number;
  likes: string[];
  userEmail: string;
}) => {
  return (
    <div className={styles.counts}>
      <div>💬 {postCommentCount}</div>
      <LikePostButton likes={likes} postId={postId} userEmail={userEmail} />
    </div>
  );
};

export default ActivityCounts;
