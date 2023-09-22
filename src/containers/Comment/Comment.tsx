import React from "react";
import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentList/CommentList";

const Comment = ({
  postId,
  isSameAuthor,
  userEmail,
}: {
  postId: string;
  isSameAuthor: boolean;
  userEmail: string;
}) => {
  return (
    <div>
      <CommentForm postId={postId} userEmail={userEmail} />
      <CommentList postId={postId} />
    </div>
  );
};

export default Comment;
