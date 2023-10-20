'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { BsArrowUpRightSquare } from 'react-icons/bs';

import { CommentInterface } from '@/types/types';
import { getDateForm } from '@/utils/getDateForm';
import { deleteCommentApi } from '@/services/commentsFetch';

import styles from './ManageCommentItem.module.scss';

interface ManageCommentItemPropsInterface {
  comments: CommentInterface[];
  setComments: Dispatch<SetStateAction<CommentInterface[]>>;
  day: string;
  commentsByOneDay: CommentInterface[];
}

const ManageCommentItem = (props: ManageCommentItemPropsInterface) => {
  const { comments, setComments, day, commentsByOneDay } = props;

  // 삭제 버튼 클릭 이벤트
  const handleClickDeleteButton = async (postId: string, _id: string) => {
    // 댓글 삭제 확인
    if (!window.confirm('정말로 댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      // DELETE 요청을 보냅니다.
      const res = await deleteCommentApi(postId, _id);

      // 삭제 권한이 없는 경우
      if (!res) {
        window.alert('삭제 권한이 없습니다.');
        return;
      }

      // 삭제한 댓글을 제외한 결과를 state에 저장합니다.
      const afterDeleteComments: CommentInterface[] = comments.filter(
        (comment: CommentInterface) => String(comment._id) !== _id,
      );
      setComments(afterDeleteComments);
    } catch (err) {
      console.error(err);
    }
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
                  <button
                    className={styles.deleteLikeButton}
                    onClick={() => handleClickDeleteButton(String(parentId), String(_id))}
                    type='button'
                  >
                    삭제하기
                  </button>
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
