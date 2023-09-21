import React from "react";
import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentList/CommentList";

const Comment = ({ isSameAuthor, userEmail }: { isSameAuthor: boolean; userEmail: string }) => {
  return (
    <div>
      <CommentForm userEmail={userEmail} />
      <CommentList />
    </div>
  );
};

export default Comment;
