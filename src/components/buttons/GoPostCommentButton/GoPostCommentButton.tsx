import Link from "next/link";
import React from "react";
import styles from "./GoPostCommentButton.module.scss";
import { BsChatDots } from "react-icons/bs";

const GoPostCommentButton = ({ children, postId }: { children: any; postId: string }) => {
  return (
    <button className={styles.goPostCommentButton}>
      <BsChatDots />
      {children}
    </button>
  );
};

export default GoPostCommentButton;
