"use client";

import React, { useState } from "react";
import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentList/CommentList";

interface CommentProps {
  postId: string;
  userEmail: string;
}

const Comment = ({ postId, userEmail }: CommentProps) => {
  const [newUpdate, setNewUpdate] = useState<boolean>(false);

  const commentListProps = {
    postId,
    newUpdate,
    userEmail,
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
