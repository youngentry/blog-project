'use client';

import React, { useState } from 'react';

import { CommentInterface, CommentListPropsInterface } from '@/types/types';
import useCommentList from '@/hooks/useCommentList';

import styles from './CommentList.module.scss';
import UserProfile from '@/components/UserProfile/UserProfile';
import CommentItemHead from '../CommentItemHead/CommentItemHead';
import CommentItemBody from '../CommentItemBody/CommentItemBody';
import CommentItemBottom from '../CommentItemBottom/CommentItemBottom';

// 댓글 목록입니다.
const CommentList = ({
  postId,
  newUpdate,
  userEmail,
  postEmail,
  postCommentCount,
  setPostCommentCount,
}: CommentListPropsInterface) => {
  const [editCommentInput, setEditCommentInput] = useState<string>(''); // 수정 input
  const [editingCommentId, setEditingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const { commentList, setCommentList } = useCommentList(postId, newUpdate);

  // 댓글 머리 (닉네임, 수정, 삭제 버튼 등)
  const commentItemHeadProps = {
    commentList,
    setCommentList,
    userEmail,
    postEmail,
    postId,
    postCommentCount,
    setPostCommentCount,
    setEditingCommentId,
    setEditCommentInput,
  };

  // 댓글 본문
  const commentItemBodyProps = {
    commentList,
    setCommentList,
    postId,
    editingCommentId,
    setEditingCommentId,
    editCommentInput,
    setEditCommentInput,
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
              <div className={styles.contentBox}>
                <CommentItemHead
                  {...commentItemHeadProps}
                  commentId={commentId}
                  isLoggedIn={isLoggedIn}
                  nickname={nickname}
                  author={author}
                  comment={comment}
                />
                <CommentItemBody {...commentItemBodyProps} commentId={commentId} comment={comment} />
                <CommentItemBottom date={date} />
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CommentList;
