'use client';

import React from 'react';

import useManageComments, { useManageCommentsInterface } from '@/hooks/useManageComments';
import { CommentInterface } from '@/types/types';
import { getDateForm } from '@/utils/getDateForm';
import { DESCRIPTION } from '@/constants/DESCRIPTION';

import ManageDescription from '../../components/descriptions/ManageDescription/ManageDescription';
import NoItem from '../ManageLikes/components/NoItem/NoItem';
import ManageCommentItem from './components/ManageCommentItem/ManageCommentItem';
import styles from './ManageComments.module.scss';
import Spin from '@/components/loadings/Spin/Spin';

interface ManageCommentsInterface {
  [key: string]: CommentInterface[];
}

const ManageComments = () => {
  // 댓글 목록 state
  const { comments, setComments, loading }: useManageCommentsInterface = useManageComments();

  /**
   * 날짜별로 comment data 반환
   * @param comments
   * @returns {ManageCommentsInterface}
   */
  const getManageCommentData = (commentsData: CommentInterface[]) => {
    const result: ManageCommentsInterface = {};

    commentsData.forEach((comment) => {
      const date: string = getDateForm(comment.date);
      result[date] = result[date] ? [...result[date], comment] : [comment];
    });

    return result;
  };

  const manageCommentData: ManageCommentsInterface = getManageCommentData(comments);
  const days: string[] = Object.keys(manageCommentData); // 날짜 배열
  // [[comment1, comment2],[comment3, comment4]][0]과 같은 형태로 컴포넌트에 댓글 배열이 전달됩니다.
  const commentsByDays: CommentInterface[][] = Object.values(manageCommentData);

  // 로딩 중에 출력할 컴포넌트
  if (loading) {
    return (
      <div className={styles.container}>
        <ManageDescription title='내가 작성한 댓글' description={DESCRIPTION.MANAGE_COMMENTS} />
        <Spin size='s' />
      </div>
    );
  }

  // 작성한 댓글이 없을 경우 출력할 컴포넌트
  if (!comments.length) {
    return (
      <NoItem h2='아직 댓글을 작성한 게시물이 없습니다.' src='/images/manageActivity/comment-activity-sample.png' />
    );
  }

  return (
    <div className={styles.container}>
      <ManageDescription title='내가 작성한 댓글' description={DESCRIPTION.MANAGE_COMMENTS} />
      {days.map((day: string, index: number) => {
        const commentsByOneDay = commentsByDays[index];
        return (
          <ManageCommentItem
            key={day}
            day={day}
            comments={comments}
            setComments={setComments}
            commentsByOneDay={commentsByOneDay}
          />
        );
      })}
    </div>
  );
};

export default ManageComments;
