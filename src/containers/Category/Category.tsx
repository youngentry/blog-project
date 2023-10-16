'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import usePostCards, { UsePostCardsInterface } from '@/hooks/usePostCards';

import styles from './Category.module.scss';
import CardItem from './components/Card/CardItem';
import Spin from '@/components/loadings/Spin/Spin';

// category (게시물 목록)페이지입니다.
const Category = () => {
  const subtitle = useSearchParams().get('subtitle') || undefined; // 카테고리 쿼리

  const { postCards, loading }: UsePostCardsInterface = usePostCards(subtitle); // 게시물 카드 state

  // 데이터를 로드하는 중에 표시할 화면
  if (loading) {
    return (
      <div className={styles.category}>
        <h2>{subtitle || '전체 게시물'}</h2>
        <Spin size='s' message='게시물 목록을 불러오는 중입니다.' />
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <h2>{subtitle || '전체 게시물'}</h2>
      {postCards ? <CardItem postCards={postCards} /> : <div>게시물이 존재하지 않습니다.</div>}
    </div>
  );
};

export default Category;
