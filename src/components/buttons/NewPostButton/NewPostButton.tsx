import React from "react";
import { BsPencil } from "react-icons/bs";
import styles from "./NewPostButton.module.scss";
import Notice from "@/components/notices/Notice";

const NewPostButton = () => {
  return (
    <button className={styles.newPostButton}>
      <BsPencil />
      <div className={styles.notice}>
        <Notice boxPosition="right">글쓰기</Notice>
      </div>
    </button>
  );
};

export default NewPostButton;
