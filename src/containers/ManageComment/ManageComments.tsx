"use client";

import React from "react";
import styles from "./ManageComments.module.scss";
import ManageCommentItem from "./components/ManageCommentItem/ManageCommentItem";
import useComments, { UseCommentsInterface } from "@/hooks/useComments";
import { Comment } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";

interface ManageCommentsInterface {
  [key: string]: Comment[];
}

const ManageComments = () => {
  const { comments, setComments }: UseCommentsInterface = useComments();

  /**
   * 날짜별로 comment data 반환
   * @param comments
   * @returns {ManageCommentsInterface} ex) ['2023.10.05']
   */
  const getManageCommentData = (comments: Comment[]) => {
    const result: any = {};

    comments.forEach((comment) => {
      const date = getDateForm(comment.date);
      result[date] = result[date] ? [...result[date], comment] : [comment];
    });

    return result;
  };

  const manageCommentData: ManageCommentsInterface = getManageCommentData(comments);
  const dates = Object.keys(manageCommentData);
  const eachDayComments = Object.values(manageCommentData);

  return (
    <div className={styles.container}>
      {comments.length ? (
        dates.map((date: string, index: number) => {
          const comments = eachDayComments[index];
          return (
            <ul key={date} className={styles.dates}>
              <li className={styles.oneDate}>
                <div className={styles.likedDate}>오늘</div>
                <ul className={styles.postList}>
                  <ManageCommentItem comments={comments} setComments={setComments} />
                </ul>
              </li>
            </ul>
          );
        })
      ) : (
        <div>좋아요 한 게시물이 없습니다.</div>
      )}
    </div>
  );
};

export default ManageComments;
