"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList/CommentList";

interface CommentProps {
  title: string;
  postId: string;
  userEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

const Comment = ({ title, postId, userEmail, postCommentCount, setPostCommentCount }: CommentProps) => {
  const [newUpdate, setNewUpdate] = useState<boolean>(false); // 댓글 변경 시 컴포넌트 재렌더링에 이용될 의존성

  const commentListProps = {
    postId,
    newUpdate,
    userEmail,
    postCommentCount,
    setPostCommentCount,
  };

  const commentFormProps = {
    ...commentListProps,
    title,
    setNewUpdate,
  };

  return (
    <div>
      <CommentForm {...commentFormProps} />
      <CommentList {...commentListProps} />
    </div>
  );
};

export default Comment;
