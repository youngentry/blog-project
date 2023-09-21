import React from "react";
import CommentForm from "./CommentForm/CommentForm";
import { CommentProps } from "@/types/post";
import CommentList from "./CommentList/CommentList";
import styles from "./Comment.module.scss";

const Comment = (commentProps: CommentProps) => {
  return (
    <div>
      <CommentForm {...commentProps} />
      <CommentList />
    </div>
  );
};

export default Comment;
