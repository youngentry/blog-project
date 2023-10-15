'use client';

import { useEffect, useState } from 'react';

import usePostItem, { UsePostItemInterface } from '@/hooks/usePostItem';
import { PostInterface } from '@/types/types';

import styles from './PostItem.module.scss';
import Comment from '../Comment/Comment';
import Spin from '@/components/loadings/Spin/Spin';
import CountsBox from './components/CountsBox/CountsBox';
import PostHead from './components/PostHead/PostHead';
import PostContent from './components/PostContent/PostContent';

// 게시물 하나의 컴포넌트입니다.
const PostItem = ({ postId, userEmail }: { postId: string; userEmail: string }) => {
  const { postData, loading }: UsePostItemInterface = usePostItem(postId); // 게시물 데이터
  const [postCommentCount, setPostCommentCount] = useState<number>(0); // 게시물 댓글 갯수

  // 게시물 댓글 갯수 렌더링
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

  const { title, subtitle, contents, src, email, author, date, likes }: PostInterface = postData;

  const PostHeadProps = {
    userEmail,
    email,
    postId,
    title,
    subtitle,
    author,
    date,
  };

  const PostContentProps = {
    contents,
    src,
  };

  const countsBoxProps = {
    userEmail,
    postId,
    likes,
    postCommentCount,
  };

  const commentProps = {
    userEmail,
    postId,
    title,
    postCommentCount,
    setPostCommentCount,
  };

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <PostHead {...PostHeadProps} />
        <PostContent {...PostContentProps} />
        <CountsBox {...countsBoxProps} />
        <Comment {...commentProps} />
      </div>
    </div>
  );
};

export default PostItem;
