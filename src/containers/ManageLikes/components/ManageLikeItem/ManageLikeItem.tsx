'use client';

import React from 'react';
import Link from 'next/link';
import { BsArrowUpRightSquare } from 'react-icons/bs';
import { sanitize } from 'dompurify';
import Image from 'next/image';

import { getDateForm } from '@/utils/getDateForm';
import { Post } from '@/types/post';

import styles from './ManageLikeItem.module.scss';
import LikePostButton from '@/components/buttons/LikePostButton/LikePostButton';

interface ManageLikeItemPropsInterface {
  likedPost: Post[];
  email: string;
}

const ManageLikeItem = (props: ManageLikeItemPropsInterface) => {
  const { likedPost, email } = props;
  return (
    <>
      {likedPost.map((likePostData: Post) => {
        const { contents, id, title, date, _id, src, likes } = likePostData;

        return (
          <li key={String(_id)} className={styles.container}>
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitize(contents.substring(0, 200)),
                  }}
                />
                <Image className={styles.image} src={src} alt='post image' width={160} height={120} />
              </div>
              <p className={styles.time}>{getDateForm(date, true)}</p>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ManageLikeItem;
