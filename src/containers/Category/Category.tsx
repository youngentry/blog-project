'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import usePostCards, { UsePostCardsInterface } from '@/hooks/usePostCards';

import styles from './Category.module.scss';
import Spin from '@/components/loadings/Spin/Spin';
import CardItem from './components/CardItem/CardItem';

const Head = ({ title, subtitle, author }: { title: string; subtitle: string; author: string }) => {
  let headerText = '전체 게시물';

  if (title) {
    headerText = `"${title}" 검색 결과`;
  } else if (subtitle) {
    headerText = subtitle;
  } else if (author) {
    headerText = `"${author}"님의 게시물`;
  }

  return <h2>{headerText}</h2>;
};

// category (게시물 목록)페이지입니다.
const Category = () => {
  const LOADING_POST_LIST = '게시물 목록을 불러오는 중입니다.';

  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const subtitle = searchParams.get('subtitle') || '';
  const author = searchParams.get('author') || '';

  const { postCards, loading }: UsePostCardsInterface = usePostCards(title, subtitle, author);

  if (loading) {
    return (
      <div className={styles.category}>
        <Head title={title} subtitle={subtitle} author={author} />
        <Spin size='s' message={LOADING_POST_LIST} />
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <Head title={title} subtitle={subtitle} author={author} />
      {postCards.length ? <CardItem postCards={postCards} /> : <div>게시물이 존재하지 않습니다.</div>}
    </div>
  );
};

export default Category;
