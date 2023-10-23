import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowUpRightSquare } from 'react-icons/bs';

import { SlideItemPropsInterface } from '@/types/types';

import styles from './SliderItem.module.scss';

const SliderItem = ({ slideItemProps }: { slideItemProps: SlideItemPropsInterface }) => {
  const { title, src, content, link } = slideItemProps;
  return (
    <Link href={link} target='_blank' rel='noopener noreferrer' prefetch={false}>
      <div className={styles.container}>
        <div className={styles.imageBox}>
          <Image className={styles.image} src={src} alt='post image' width={1000} height={1000} />
        </div>
        <div className={styles.contentsBox}>
          <div className={styles.contents}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{content}</p>
            <div className={styles.linkBox}>
              <p>게시물 보러가기</p>
              <BsArrowUpRightSquare />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SliderItem;
