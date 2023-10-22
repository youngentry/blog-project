'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { BsArrowUpRightSquare } from 'react-icons/bs';

import { CommentInterface } from '@/types/types';
import { getDateForm } from '@/utils/getDateForm';

import styles from './ManageCommentItem.module.scss';
import DeleteCommentButton from '@/components/buttons/DeleteCommentButton/DeleteCommentButton';

interface ManageCommentItemPropsInterface {
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  day: string;
  commentsByOneDay: CommentInterface[];
}

const ManageCommentItem = (props: ManageCommentItemPropsInterface) => {
  const { commentList, setCommentList, day, commentsByOneDay } = props;

  const deleteCommentButtonProps = {
    commentList,
    setCommentList,
  };

  return (
    <ul className={styles.days}>
      <li className={styles.oneDay}>
        <div className={styles.likedDate}>{day}</div>
        <ul className={styles.postList}>
          {commentsByOneDay.map((commentData: CommentInterface) => {
            const { comment, parentId, title, date, _id } = commentData;
            return (
              <li key={String(_id)} className={styles.postItem}>
                <div className={styles.itemHead}>
                  <h3 className={styles.title}>
                    <span>게시물</span>
                    <Link
                      className={styles.postLink}
                      href={`/posts/${parentId}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {title}
                      <BsArrowUpRightSquare />
                    </Link>
                    <span>에 남긴 댓글</span>
                  </h3>
                  <DeleteCommentButton
                    {...deleteCommentButtonProps}
                    postId={String(parentId)}
                    commentId={String(_id)}
                  />
                </div>
                <div className={styles.itemBody}>
                  <div className={styles.description}>
                    <p className={styles.comment}>{comment}</p>
                  </div>
                  <p className={styles.time}>{getDateForm(date, true)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
};

export default ManageCommentItem;
