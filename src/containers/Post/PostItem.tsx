'use client';

import Image from 'next/image';
// eslint-disable-next-line
import { sanitize } from 'dompurify';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { checkSameAuthor } from '@/utils/sessionCheck/checkSameAuthor';
import usePostItem, { UsePostItemInterface } from '@/hooks/usePostItem';
import { getDateForm } from '@/utils/getDateForm';

import styles from './PostItem.module.scss';
import EditPostButton from '@/components/buttons/EditPostButton/EditPostButton';
import DeletePostButton from '@/components/buttons/DeletePostButton/DeletePostButton';
import Comment from '../Comment/Comment';
import Spin from '@/components/loadings/Spin/Spin';
import GoPostCommentButton from '@/components/buttons/GoPostCommentButton/GoPostCommentButton';
import LikePostButton from '@/components/buttons/LikePostButton/LikePostButton';

// 게시물 하나의 컴포넌트입니다.
const PostItem = ({ postId, userEmail }: { postId: string; userEmail: string }) => {
  const { postData, loading }: UsePostItemInterface = usePostItem(postId); // 게시물 데이터
  const [postCommentCount, setPostCommentCount] = useState<number>(0); // 게시물 댓글 갯수

  // 게시물의 댓글 갯수를 표시하는 state입니다.
  useEffect(() => {
    const commentCountData = postData ? postData.commentCount : 0;
    setPostCommentCount(commentCountData);
  }, [postData]);

  // postData가 존재하지 않는 경우
  if (!postData) {
    return (
      <article className={styles.container}>
        {loading ? <Spin size='m' message='게시물을 불러오는 중입니다.' /> : <div>게시물이 존재하지 않습니다.</div>}
      </article>
    );
  }

  const { title, subtitle, contents, src, email, author, date, likes } = postData;

  // 같은 작성자인 경우에는 '수정', '삭제' 버튼이 나타나도록 합니다.
  const isSameAuthor: boolean = checkSameAuthor(userEmail, email); // 로그인 유저와 게시물 작성자 비교

  // 게시물 본문
  const innerHTML = { dangerouslySetInnerHTML: { __html: sanitize(contents) } };

  return (
    <article className={styles.container}>
      <div className={styles.post}>
        <header className={styles.header}>
          <div className={styles.subtitle}>
            <Link href={{ pathname: '/category', query: { subtitle } }}>
              <span>#{subtitle}</span>
            </Link>
          </div>
          <h2>{title || '제목없음'}</h2>
          <div className={styles.info}>
            <span className={styles.author}>{author}</span>
            <span className={styles.date}>{getDateForm(String(date), true)}</span>
            {isSameAuthor && (
              <div className={styles.buttons}>
                <EditPostButton postId={postId} />
                <DeletePostButton postId={postId} />
              </div>
            )}
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.thumbnail}>
            <Image src={src} alt='post content image' fill />
          </div>
          <div {...innerHTML} />
        </div>
        <div className={styles.countsBox}>
          <GoPostCommentButton>{postCommentCount}</GoPostCommentButton>
          <LikePostButton likes={likes} postId={postId} userEmail={userEmail} />
        </div>
        <Comment
          title={title}
          postId={postId}
          userEmail={userEmail}
          postCommentCount={postCommentCount}
          setPostCommentCount={setPostCommentCount}
        />
      </div>
    </article>
  );
};

export default PostItem;
