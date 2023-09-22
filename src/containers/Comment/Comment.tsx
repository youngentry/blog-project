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
  return (
    <div>
      <CommentForm
        postId={postId}
        userEmail={userEmail}
        newUpdate={newUpdate}
        setNewUpdate={setNewUpdate}
      />
      <CommentList postId={postId} newUpdate={newUpdate} userEmail={userEmail} />
    </div>
  );
};

export default Comment;
