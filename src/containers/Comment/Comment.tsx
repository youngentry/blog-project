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
  const [editingCommentId, setEditingCommentId] = useState<string>("");

  const commentFormProps = {
    postId,
    userEmail,
    newUpdate,
    setNewUpdate,
  };

  const commentListProps = {
    postId,
    newUpdate,
    userEmail,
  };

  return (
    <div>
      <CommentForm {...commentFormProps} />
      <CommentList {...commentListProps} />
    </div>
  );
};

export default Comment;
