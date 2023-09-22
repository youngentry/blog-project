"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.scss";

// 댓글 입력 폼입니다.
// userEmail이 존재하면(로그인 상태) nickname, password "고정"되어 있습니다.
// 존재하지 않을 경우(비로그인 상태) nickname, password input이 나타납니다.
const CommentForm = ({ postId, userEmail }: { postId: string; userEmail: string }) => {
  const [nickname, setNickname] = useState(userEmail || "");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const clickSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(postId);

    const data = { nickname, password, comment, postId };

    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    console.log(response.json());
  };

  return (
    <div className={styles.comment}>
      <form className={styles.form} onSubmit={(e) => clickSubmitComment(e)}>
        <div className={styles.thumbnail}>{userEmail ? <div>✅</div> : <div>😀</div>}</div>
        <div className={styles.write}>
          {userEmail ? (
            <div className={`${styles.account} ${styles.sameAuthor}`}>
              <input type="text" placeholder="이름" value={userEmail} readOnly />
              <input type="text" placeholder="비밀번호" value={""} readOnly />
            </div>
          ) : (
            <div className={styles.account}>
              <input
                type="text"
                placeholder="이름"
                value={nickname}
                minLength={1}
                maxLength={10}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="비밀번호"
                value={password}
                minLength={1}
                maxLength={20}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          )}
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력하세요"
            value={comment}
            minLength={1}
            maxLength={500}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>댓글 작성</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
