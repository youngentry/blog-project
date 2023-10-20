'use client';

import React from 'react';
import Link from 'next/link';
import { BsArrowUpRightSquare } from 'react-icons/bs';
// eslint-disable-next-line
import { sanitize } from 'dompurify';
import Image from 'next/image';

import { getDateForm } from '@/utils/getDateForm';
import { PostInterface } from '@/types/types';

import styles from './ManageLikeItem.module.scss';
import LikePostButton from '@/components/buttons/LikePostButton/LikePostButton';

interface ManageLikeItemPropsInterface {
  likedPosts: PostInterface[];
  email: string;
  day: string;
}

// XSS 스크립트 삽입 공격을 방어합니다.
const SanitizedInnerHTML = ({ contents }: { contents: string }) => {
  return (
    <div
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{
        __html: sanitize(contents.substring(0, 200)),
      }}
    />
  );
};

const ManageLikeItem = (props: ManageLikeItemPropsInterface) => {
  const { likedPosts, email, day } = props;

  return (
    <ul key={day} className={styles.days}>
      <li className={styles.ondDay}>
        <div className={styles.likedDate}>{day}</div>
        <ul className={styles.postList}>
          {likedPosts.map((likedPost: PostInterface) => {
            const { contents, id, title, date, _id, src, likes }: PostInterface = likedPost;
            return (
              <li key={String(_id)} className={styles.postItem}>
                <div className={styles.itemHead}>
                  <h3 className={styles.head}>
                    <span>게시물 제목:</span>
                    <Link className={styles.postLink} href={`/posts/${id}`} target='_blank' rel='noopener noreferrer'>
                      <p className={styles.title}>{title}</p>
                      <BsArrowUpRightSquare />
                    </Link>
                  </h3>
                  <LikePostButton className={styles.likeButton} likes={likes} postId={String(id)} userEmail={email} />
                </div>
                <div className={styles.itemBody}>
                  <div className={styles.description}>
                    <SanitizedInnerHTML contents={contents} />
                    <Image className={styles.image} src={src} alt='post image' width={160} height={120} />
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

export default ManageLikeItem;
