"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList/CommentList";

interface CommentProps {
  postId: string;
  userEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

const Comment = ({ postId, userEmail, postCommentCount, setPostCommentCount }: CommentProps) => {
  const [newUpdate, setNewUpdate] = useState<boolean>(false);

  const commentListProps = {
    postId,
    newUpdate,
    userEmail,
    postCommentCount,
    setPostCommentCount,
  };

  const commentFormProps = {
    ...commentListProps,
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
