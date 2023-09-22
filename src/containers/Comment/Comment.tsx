"use client";

import React, { useState } from "react";
import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentList/CommentList";

const Comment = ({ postId, userEmail }: { postId: string; userEmail: string }) => {
  const [newUpdate, setNewUpdate] = useState<boolean>(false);
  return (
    <div>
      <CommentForm
        postId={postId}
        userEmail={userEmail}
        newUpdate={newUpdate}
        setNewUpdate={setNewUpdate}
      />
      <CommentList postId={postId} newUpdate={newUpdate} />
    </div>
  );
};

export default Comment;
