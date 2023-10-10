"use client";

import React from "react";
import styles from "./ManageComments.module.scss";
import ManageCommentItem from "./components/ManageCommentItem/ManageCommentItem";
import useManageComments, { useManageCommentsInterface } from "@/hooks/useManageComments";
import { Comment } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";
import ManageDescription from "../../components/descriptions/ManageDescription/ManageDescription";
import { DESCRIPTION } from "@/constants/DESCRIPTION";
import NoItem from "../ManageLikes/components/NoItem/NoItem";
import useLoading from "@/hooks/useLoading";
import Spin from "@/components/loadings/Spin/Spin";

interface ManageCommentsInterface {
  [key: string]: Comment[];
}

const ManageComments = () => {
  // 댓글 목록 state
  const { comments, setComments, loading }: useManageCommentsInterface = useManageComments();

  /**
   * 날짜별로 comment data 반환
   * @param comments
   * @returns {ManageCommentsInterface}
   */
  const getManageCommentData = (comments: Comment[]) => {
    const result: ManageCommentsInterface = {};

    comments.forEach((comment) => {
      const date: string = getDateForm(comment.date);
      result[date] = result[date] ? [...result[date], comment] : [comment];
    });

    return result;
  };

  const manageCommentData: ManageCommentsInterface = getManageCommentData(comments);
  const dates: string[] = Object.keys(manageCommentData); // 날짜 배열
  // 날짜 인덱스별로 좋아요한 댓글이 담긴 배열 [[]]
  // n은 날짜 배열 index일 때. n=0 일 경우 [[comment1, comment2],[comment3, comment4]][0]과 같은 형태로 컴포넌트에 댓글 배열이 전달됩니다.
  const eachDayComments: Comment[][] = Object.values(manageCommentData);

  return (
    <div className={styles.container}>
      <h2 className={styles.manageTitle}>내가 작성한 댓글</h2>
      <ManageDescription description={DESCRIPTION.MANAGE_COMMENTS} />
      {loading ? (
        <Spin />
      ) : comments.length ? (
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
        <NoItem
          h2={"아직 댓글을 작성한 게시물이 없습니다."}
          src={"/images/manageActivity/comment-activity-sample.png"}
        />
      )}
    </div>
  );
};

export default ManageComments;
