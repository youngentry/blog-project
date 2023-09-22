"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.scss";
import { CommentFormProps, CommentsForm } from "@/types/post";

// 댓글 입력 폼입니다.
// userEmail이 존재하면(로그인 상태) nickname, password "고정"되어 있습니다.
// 존재하지 않을 경우(비로그인 상태) nickname, password input이 나타납니다.
const CommentForm = ({ postId, userEmail, newUpdate, setNewUpdate }: CommentFormProps) => {
  const [nickname, setNickname] = useState<string>(userEmail || "");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const checkValidInput = () => {
    // 비로그인 유저가 nickname또는 password입력을 했는지 검사합니다.
    if (!userEmail && (nickname.length < 1 || password.length < 1)) {
      window.alert("닉네임 또는 비밀번호를 입력해주세요.");
      return false;
    }

    // 댓글을 입력했는지 검사합니다.
    if (comment.length < 1) {
      window.alert("댓글을 입력해주세요.");
      return false;
    }

    return true;
  };

  // 댓글 작성
  const clickSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // input이 유효한지 검사합니다.
    const isValidInput = checkValidInput();
    if (!isValidInput) {
      return false;
    }

    const commentForm: CommentsForm = { nickname, password, comment };

    // POST 요청을 보냅니다.
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...commentForm,
        }),
      });
      setNewUpdate(!newUpdate);
    } catch (err) {
      console.error(err);
      window.alert("댓글 작성 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.");
    }
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
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="비밀번호"
                value={password}
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
            onChange={(e) => setComment(e.target.value)}
          />
          <button>댓글 작성</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
