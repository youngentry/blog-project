"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.scss";

// 댓글 입력 폼입니다.
// userEmail이 존재하면(로그인 상태) name, password input 값은 고정되어 있습니다.
// 존재하지 않을 경우(비로그인 상태) name, password input이 나타납니다.
const CommentForm = ({ userEmail }: { userEmail: string }) => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className={styles.comment}>
      <form className={styles.form}>
        <div className={styles.thumbnail}>{userEmail ? <div>✅</div> : <div>😀</div>}</div>
        <div className={styles.write}>
          {userEmail ? (
            <div className={`${styles.account} ${styles.sameAuthor}`}>
              <input type="text" placeholder="이름" value={userEmail} readOnly />
              <input type="text" placeholder="비밀번호" value={"loggedIn"} readOnly />
            </div>
          ) : (
            <div className={styles.account}>
              <input
                type="text"
                placeholder="이름"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="비밀번호"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
          )}
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
