"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.scss";
import { CommentFormProps, CommentsForm } from "@/types/post";
import { COMMENT_FORM_LENGTH } from "@/constants/commentConstants";
import {
  CustomInput,
  CustomTextarea,
  ReadOnlyInput,
} from "@/components/inputs/CustomInputs/CustomInputs";

// 댓글 입력 폼입니다.
// 비로그인 상태에서는(userEmail이 존재하지 않을 경우에) nickname, password input이 나타납니다.
const CommentForm = ({ postId, userEmail, newUpdate, setNewUpdate }: CommentFormProps) => {
  const [nickname, setNickname] = useState<string>(userEmail || "");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [inputs, setInputs] = useState({
    nickname: "",
    password: "",
    comment: "",
  });

  const { MIN_NICKNAME, MIN_PASSWORD, MIN_COMMENT, MAX_NICKNAME, MAX_PASSWORD, MAX_COMMENT } =
    COMMENT_FORM_LENGTH; // input length 조건

  // input 유효성 검사
  const checkValidInput = () => {
    // 비로그인 유저가 nickname또는 password입력을 했는지 검사합니다.
    if (!userEmail && (nickname.length < MIN_NICKNAME || password.length < MIN_PASSWORD)) {
      window.alert("닉네임 또는 비밀번호를 입력해주세요.");
      return false;
    }

    // 댓글을 입력했는지 검사합니다.
    if (comment.length < MIN_COMMENT) {
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

      successSubmit(); // 댓글 작성요청 성공 시 실행할 함수
    } catch (err) {
      console.error(err);
      window.alert("댓글 작성 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.");
    }
  };

  const successSubmit = () => {
    // form 초기화
    setComment("");
    setNickname("");
    setPassword("");

    setInputs({ nickname: "", comment: "", password: "" });

    // client component 업데이트
    setNewUpdate(!newUpdate);
  };

  const nicknameInputProps = {
    value: nickname,
    maxLength: MAX_NICKNAME,
    dispatch: setNickname,
  };

  const passwordInputProps = {
    value: password,
    maxLength: MAX_PASSWORD,
    dispatch: setPassword,
  };

  const commentInputProps = {
    value: comment,
    maxLength: MAX_COMMENT,
    dispatch: setComment,
  };

  return (
    <div className={styles.comment}>
      <form className={styles.form} onSubmit={(e) => clickSubmitComment(e)}>
        <div className={styles.thumbnail}>{userEmail ? <div>✅</div> : <div>😀</div>}</div>
        <div className={styles.write}>
          {userEmail ? (
            <div className={`${styles.account} ${styles.sameAuthor}`}>
              <ReadOnlyInput placeholder={"닉네임"} value={userEmail} />
              <ReadOnlyInput placeholder={"비밀번호"} value={""} />
            </div>
          ) : (
            <div className={styles.account}>
              <CustomInput placeholder={"닉네임"} {...nicknameInputProps} />
              <CustomInput placeholder={"비밀번호"} {...passwordInputProps} />
            </div>
          )}
          <CustomTextarea
            className={styles.textarea}
            placeholder={"댓글을 입력하세요"}
            {...commentInputProps}
          />
          <button>댓글 작성</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
