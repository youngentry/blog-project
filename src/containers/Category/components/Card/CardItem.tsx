import Image from 'next/image';
import Link from 'next/link';

import { CardInterface } from '@/types/types';
import { getDateForm } from '@/utils/getDateForm';

import styles from './CardItem.module.scss';
import LikePostButton from '@/components/buttons/LikePostButton/LikePostButton';
import GoPostCommentButton from '@/components/buttons/GoPostCommentButton/GoPostCommentButton';

// category (게시물 목록)페이지에서 하나의 게시물 카드입니다.
const CardItem = ({ postCards }: { postCards: CardInterface[] }) => {
  return (
    <ul className={styles.cardContainer}>
      {postCards.map((card: CardInterface) => {
        const { id, src, title, subtitle, commentCount, likes, author, date, email } = card;
        const formedDate = getDateForm(date);
        const link = `/posts/${id}`;

        return (
          <li key={id} className={styles.card}>
            <Link prefetch={false} href={link}>
              <Image className={styles.image} src={src} alt='post cover' width={300} height={300 * 0.75} />
            </Link>
            <div className={styles.content}>
              <h3 className={styles.title}>
                <Link prefetch={false} href={link}>
                  {title || '제목 없음'}
                </Link>
              </h3>
              <ul className={styles.subtitle}>
                <Link href={{ pathname: '/category', query: { subtitle } }}>
                  <li className={styles.subtitle}>{subtitle}</li>
                </Link>
              </ul>
              <div className={styles.more}>
                <div className={styles.write}>
                  <div className={styles.author}>{author}</div>
                  <div className={styles.date}>{formedDate}</div>
                </div>
                <div className={styles.counts}>
                  <GoPostCommentButton>{commentCount}</GoPostCommentButton>
                  <LikePostButton likes={likes} postId={String(id)} userEmail={email} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CardItem;
