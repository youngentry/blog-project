'use client';

import React, { useState } from 'react';

import { CommentInterface, CommentListPropsInterface } from '@/types/types';
import { COMMENT_FORM_LENGTH } from '@/constants/LENGTH';
import useCommentList from '@/hooks/useCommentList';
import ConfirmEditCommentButton from '@/containers/Comment/components/ConfirmEditCommentButton/ConfirmEditCommentButton';
import CancelEditCommentButton from '@/containers/Comment/components/CancelEditCommentButton/CancelEditCommentButton';
import { getKrTime } from '@/utils/getKrTime';

import styles from './CommentList.module.scss';
import UserProfile from '@/components/UserProfile/UserProfile';
import CustomTextarea from '@/components/inputs/CustomTextarea/CustomTextarea';
import CommentItemHead from '../CommentItemHead/CommentItemHead';

// 댓글 목록입니다.
const CommentList = ({
  postId,
  newUpdate,
  userEmail,
  postEmail,
  postCommentCount,
  setPostCommentCount,
}: CommentListPropsInterface) => {
  const { MAX_COMMENT } = COMMENT_FORM_LENGTH;

  const [editCommentInput, setEditCommentInput] = useState<string>(''); // 수정 input
  const [editingCommentId, setEditingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const { commentList, setCommentList } = useCommentList(postId, newUpdate);

  // 코멘트 수정 초기화
  const initCommentEdit = () => {
    setEditingCommentId(''); // 수정할 댓글 id 초기화
    setEditCommentInput(''); // 수정할 댓글 초기화
  };

  // 댓글 수정 input
  const editCommentInputProps = {
    value: editCommentInput,
    maxLength: MAX_COMMENT,
    dispatch: setEditCommentInput,
  };

  // 댓글 수정 확인 button
  const confirmEditCommentButtonProps = {
    postId,
    editCommentInput,
    commentList,
    setCommentList,
    initCommentEdit,
  };

  // 댓글 수정 취소 button
  const cancelEditCommentButtonProps = {
    initCommentEdit,
  };

  const commentItemHeadProps = {
    userEmail,
    postEmail,
    postId,
    postCommentCount,
    setPostCommentCount,
    setEditCommentInput,
    setEditingCommentId,
    commentList,
    setCommentList,
  };

  return (
    <ul className={styles.commentList}>
      {commentList &&
        commentList.map((commentItem: CommentInterface) => {
          const { comment, date, isLoggedIn, nickname, author, _id } = commentItem;
          const commentId = String(_id); // key에 할당하기 위해 직렬화합니다.

          return (
            <li key={commentId} className={`${styles.commentItem}`}>
              <div className={styles.thumbnail}>
                <UserProfile isLoggedIn={isLoggedIn} />
              </div>
              <div className={styles.content}>
                <CommentItemHead
                  {...commentItemHeadProps}
                  commentId={commentId}
                  isLoggedIn={isLoggedIn}
                  nickname={nickname}
                  author={author}
                  comment={comment}
                />
                <div className={`${styles.body} ${editingCommentId === commentId && 'hide'}`}>
                  <p className={`${styles.comment} `}>{comment}</p>
                </div>
                <div className={`${styles.editForm} ${editingCommentId === commentId && 'visible'}`}>
                  <CustomTextarea
                    className={`${styles.textarea}`}
                    placeholder='댓글을 입력하세요.'
                    {...editCommentInputProps}
                  />
                  <ConfirmEditCommentButton {...confirmEditCommentButtonProps} commentId={commentId} />
                  <CancelEditCommentButton {...cancelEditCommentButtonProps} />
                </div>

                <div className={`${styles.bottom}`}>
                  <p className={styles.date}>{getKrTime(date)}</p>
                  <div>답글 쓰기</div>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CommentList;
