'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';

import CommentForm from './components/CommentForm/CommentForm';
import CommentList from './components/CommentList/CommentList';

interface CommentProps {
  postId: string;
  postTitle: string;
  userRole: string | null | undefined;
  postEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

// 댓글 폼과 댓글 리스트입니다.
const Comment = ({ postId, postTitle, userRole, postEmail, postCommentCount, setPostCommentCount }: CommentProps) => {
  const [newUpdate, setNewUpdate] = useState<boolean>(false); // 댓글 변경 시 컴포넌트 재렌더링에 이용될 의존성

  const commentFormProps = {
    postId,
    postTitle,
    userRole,
    postEmail,
    postCommentCount,
    setPostCommentCount,
    newUpdate,
    setNewUpdate,
  };

  return (
    <div>
      <CommentForm {...commentFormProps} />
      <CommentList {...commentFormProps} />
    </div>
  );
};

export default Comment;
