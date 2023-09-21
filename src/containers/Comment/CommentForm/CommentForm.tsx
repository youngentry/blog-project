import React from "react";
import styles from "./CommentForm.module.scss";

const CommentForm = () => {
  return (
    <div className={styles.comment}>
      <form className={styles.form}>
        <div className={styles.thumbnail}>😀</div>
        <div className={styles.write}>
          <div className={styles.account}>
            <input type="text" placeholder="이름" />
            <input type="text" placeholder="비밀번호" />
          </div>
          <textarea className={styles.textarea} name="" id="" placeholder="내용을 입력하세요"></textarea>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
