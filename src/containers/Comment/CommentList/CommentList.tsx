"use client";

import React, { useState, useEffect } from "react";
import styles from "./CommentList.module.scss";
import { CommentListProps, Comments } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";

const CommentList = ({ postId, newUpdate, userEmail }: CommentListProps) => {
  const [comments, setComments] = useState<Comments[]>([]);

  // 댓글을 불러와 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const response = await fetch(`/api/posts/${postId}/comments`, { method: "GET" });
        const parsedData = await response.json();
        const foundComments: Comments[] = parsedData.comments;

        // 불러온 댓글을 state에 저장합니다.
        setComments(foundComments);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId, newUpdate]);

  const handleClickDelete = async (e: any, commentId: string) => {
    e.preventDefault();

    try {
      // GET 요청을 보냅니다.
      const response = await fetch(`/api/posts/${postId}/comments?_id=${commentId}`, {
        method: "DELETE",
      });

      // 올바른 응답이 아닌 경우, 알림을 띄우고 함수를 종료합니다.
      if (response.status !== 200) {
        window.alert("삭제 권한이 없습니다.");
        return;
      }

      // 삭제한 댓글을 제외한 결과를 state에 저장합니다.
      const afterDeleteComments: Comments[] = comments.filter(
        (comment: Comments) => String(comment._id) !== commentId
      );
      setComments(afterDeleteComments);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul className={styles.commentList}>
      {comments.map((commentItem: Comments) => {
        let { comment, date, isLoggedIn, nickname, author, thumbnail, _id } = commentItem;
        date = new Date(date); // YYYY.MM.DD 형태로 변환하기 위해 Date 객체로 만듭니다.
        const commentId = String(_id); // key에 할당하기 위해 직렬화합니다.

        // 댓글 수정 및 삭제 권한이 있는지 여부에 따라 삭제 버튼이 나타나도록 합니다.
        const isSameCommenter: boolean = isLoggedIn && userEmail === author; // 동일한 댓글 작성자
        const isBlogAdmin: boolean = checkBlogAdmin(userEmail); // 블로그 관리자
        const canEditComment: boolean = isSameCommenter || !isLoggedIn || isBlogAdmin; // 수정 권한

        return (
          <li key={String(_id)} className={`${styles.commentItem}`}>
            <div className={styles.thumbnail}>{isLoggedIn ? "✅" : "😀"}</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.nickname}>{nickname}</div>
                {canEditComment && (
                  <div>
                    <button className={styles.edit}>수정</button>
                    <button className={styles.delete} onClick={(e) => handleClickDelete(e, commentId)}>
                      삭제
                    </button>
                  </div>
                )}
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
