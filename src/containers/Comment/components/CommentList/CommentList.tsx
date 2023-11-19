'use client';

import React, { useState } from 'react';

import { CommentInterface, CommentFormPropsInterface } from '@/types/types';
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
  setNewUpdate,
  userRole,
  postEmail,
  postCommentCount,
  setPostCommentCount,
}: CommentFormPropsInterface) => {
  const [editCommentInput, setEditCommentInput] = useState<string>(''); // 수정 input
  const [editingCommentId, setEditingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const { commentList, setCommentList } = useCommentList(postId, newUpdate);

  // 댓글 머리 (닉네임, 수정, 삭제 버튼 등)
  const commentItemHeadProps = {
    commentList,
    setCommentList,
    userRole,
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

  // 댓글의 답글용 form props
  const commentFormProps = {
    postId,
    userRole,
    postEmail,
    postCommentCount,
    setPostCommentCount,
    newUpdate,
    setNewUpdate,
  };

  return (
    <ul className={styles.commentList}>
      {commentList &&
        commentList.map((commentItem: CommentInterface) => {
          const { comment, date, isLoggedIn, nickname, author, _id, depth, replyToNickname, parentCommentId } =
            commentItem;
          const commentId = String(_id); // key에 할당하기 위해 직렬화합니다.
          return (
            <li
              key={commentId}
              className={`${styles.commentItem}`}
              style={{ paddingLeft: `${0.5 + (depth || 0) * 4}rem` }}
            >
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
                <CommentItemBody
                  {...commentItemBodyProps}
                  commentId={commentId}
                  comment={comment}
                  replyToNickname={replyToNickname}
                />
                <CommentItemBottom
                  {...commentFormProps}
                  date={date}
                  commentId={commentId}
                  depth={depth}
                  replyToNickname={nickname}
                  replyToEmail={author}
                  parentCommentId={parentCommentId || String(_id)}
                />
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CommentList;
