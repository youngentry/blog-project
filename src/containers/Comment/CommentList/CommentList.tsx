"use client";

import React, { useState, useEffect } from "react";
import styles from "./CommentList.module.scss";
import { Comments } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comments[]>([]);

  // 댓글을 불러와 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`, { method: "GET" });
        const parsedData = await response.json();
        const foundComments: Comments[] = parsedData.comments;

        setComments(foundComments);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  console.log(comments);

  return (
    <ul className={styles.commentList}>
      {comments.map((commentItem: Comments) => {
        let { comment, date, isLoggedIn, nickname, author, thumbnail, _id } = commentItem;
        date = new Date(date);
        return (
          <li key={String(_id)} className={`${styles.commentItem}`}>
            <div className={styles.thumbnail}>{isLoggedIn ? "✅" : "😀"}</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.nickname}>{nickname}</div>
                <div className={styles.edit}>수정</div>
                <div className={styles.delete}>삭제</div>
              </div>
              <p className={styles.comment}>{comment}</p>
              <p className={styles.date}>{getDateForm(date)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
