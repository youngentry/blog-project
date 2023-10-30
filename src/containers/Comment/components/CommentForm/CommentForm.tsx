'use client';

import React, { useState, FormEvent } from 'react';

import { CommentFormPropsInterface, CommentFormInterface } from '@/types/types';
import { COMMENT_FORM_LENGTH } from '@/constants/LENGTH';
import { postCommentApi } from '@/services/commentsFetch';

import styles from './CommentForm.module.scss';
import CustomInput from '@/components/inputs/CustomInput/CustomInput';
import ReadOnlyInput from '@/components/inputs/ReadOnlyInput/ReadOnlyInput';
import CustomTextarea from '@/components/inputs/CustomTextarea/CustomTextarea';

// 댓글 입력 폼입니다.
// 비로그인 상태에서는 nickname, password input이 나타납니다.
const CommentForm = (props: CommentFormPropsInterface) => {
  const {
    postId,
    postTitle,
    newUpdate,
    userEmail,
    setNewUpdate,
    postCommentCount,
    setPostCommentCount,
    parentCommentId,
    depth,
    replyToNickname,
    replyToEmail,
    setReplyingCommentId,
  } = props;

  const [nickname, setNickname] = useState<string>(userEmail || '');
  const [password, setPassword] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const { MIN_NICKNAME, MIN_PASSWORD, MIN_COMMENT, MAX_NICKNAME, MAX_PASSWORD, MAX_COMMENT } = COMMENT_FORM_LENGTH; // input length 조건

  // input 유효성 검사
  const checkValidInput = () => {
    // 비로그인 유저가 nickname또는 password입력을 했는지 검사합니다.
    if (!userEmail && (nickname.length < MIN_NICKNAME || password.length < MIN_PASSWORD)) {
      window.alert('닉네임 또는 비밀번호를 입력해주세요.');
      return false;
    }

    // 댓글을 입력했는지 검사합니다.
    if (comment.length < MIN_COMMENT) {
      window.alert('댓글을 입력해주세요.');
      return false;
    }

    return true;
  };

  // submit 성공 시 이벤트
  const successSubmit = () => {
    // form 초기화
    setComment('');
    setNickname('');
    setPassword('');
    if (setReplyingCommentId) setReplyingCommentId(null);

    // client component 업데이트
    setNewUpdate(!newUpdate);
    setPostCommentCount(postCommentCount + 1);
  };

  // 댓글 작성
  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // input이 유효한지 검사합니다.
    if (!checkValidInput()) return;

    try {
      // POST 요청을 보냅니다.
      const commentForm: CommentFormInterface = {
        postTitle,
        nickname,
        password,
        comment,
        parentCommentId,
        replyToNickname,
        replyToEmail,
      };
      const res = await postCommentApi(postId, commentForm);

      // 댓글 작성요청 성공 시 실행할 함수
      if (res) {
        successSubmit();
      }
    } catch (err) {
      console.error(err);
      window.alert('댓글 작성 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
  };

  // nickname input 속성
  const nicknameInputProps = {
    value: nickname,
    maxLength: MAX_NICKNAME,
    dispatch: setNickname,
  };

  // password input 속성
  const passwordInputProps = {
    value: password,
    maxLength: MAX_PASSWORD,
    dispatch: setPassword,
  };

  // comment input 속성
  const commentInputProps = {
    value: comment,
    maxLength: MAX_COMMENT,
    dispatch: setComment,
  };

  return (
    <div className={styles.comment}>
      <form className={styles.form} onSubmit={(e) => submitComment(e)}>
        {userEmail ? (
          <div className={`${styles.account} ${styles.sameAuthor}`}>
            <ReadOnlyInput placeholder='닉네임' value={userEmail} />
            <ReadOnlyInput placeholder='비밀번호' value='' />
          </div>
        ) : (
          <div className={styles.account}>
            <CustomInput placeholder='닉네임' {...nicknameInputProps} />
            <CustomInput placeholder='비밀번호' inputType='password' {...passwordInputProps} />
          </div>
        )}
        <div className={styles.commentBox}>
          <CustomTextarea className={styles.textarea} placeholder='댓글을 입력하세요' {...commentInputProps} />
          <button className={styles.writeCommentButton} type='submit'>
            댓글 작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
