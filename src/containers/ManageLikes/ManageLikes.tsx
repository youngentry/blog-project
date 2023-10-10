"use client";

import React from "react";
import styles from "./ManageLikes.module.scss";
import { Post } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";
import useLikes from "@/hooks/useLikes";
import ManageLikeItem from "./components/ManageLikeItem/ManageLikeItem";
import ManageDescription from "@/components/descriptions/ManageDescription/ManageDescription";
import { DESCRIPTION } from "@/constants/DESCRIPTION";
import Image from "next/image";
import NoItem from "./components/NoItem/NoItem";
import Spin from "@/components/loadings/Spin/Spin";

export interface ManageLikesInterface {
  [key: string]: Post[];
}

const ManageLikes = ({ email }: { email: string }) => {
  // 좋아요 한 게시물 목록
  const { likes, setLikes, loading }: any = useLikes();

  /**
   * 날짜별로 게시물 data 반환
   * @param likes
   * @returns {ManageCommentsInterface}
   */
  const getManageLikesData = (likes: Post[]) => {
    const result: ManageLikesInterface = {};

    likes.forEach((Likes) => {
      const date: string = getDateForm(Likes.date);
      result[date] = result[date] ? [...result[date], Likes] : [Likes];
    });

    return result;
  };

  const manageLikesData: ManageLikesInterface = getManageLikesData(likes);
  const dates: string[] = Object.keys(manageLikesData); // 날짜 배열
  // 날짜 인덱스별로 좋아요한 게시물이 담긴 배열 [[]]
  // n은 날짜 배열 index일 때. n=0 일 경우 [[comment1, comment2],[comment3, comment4]][0]과 같은 형태로 컴포넌트에 좋아요 한 게시물 배열이 전달됩니다.
  const eachDayLikes: Post[][] = Object.values(manageLikesData);

  return (
    <div className={styles.container}>
      <h2 className={styles.manageTitle}>좋아요 한 게시물</h2>
      <ManageDescription description={DESCRIPTION.MANAGE_LIKES} />

      {loading ? (
        <Spin />
      ) : likes.length ? (
        dates.map((date: string, index: number) => {
          const likes = eachDayLikes[index];
          return (
            <ul key={date} className={styles.dates}>
              <li className={styles.oneDate}>
                <div className={styles.likedDate}>{date}</div>
                <ul className={styles.postList}>
                  <ManageLikeItem likes={likes} email={email} />
                </ul>
              </li>
            </ul>
          );
        })
      ) : (
        <NoItem
          h2={"아직 좋아요 한 게시물이 없습니다."}
          src={"/images/manageActivity/likes-activity-sample.png"}
        />
      )}
    </div>
  );
};

export default ManageLikes;
