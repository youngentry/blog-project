'use client';

import React from 'react';

import { CardInterface } from '@/types/types';
import usePostCards from '@/hooks/usePostCards';

import CardItem from './components/Card/CardItem';
import styles from './Category.module.scss';
import Spin from '@/components/loadings/Spin/Spin';

// category (게시물 목록)페이지입니다.
// 게시물 카드를 map으로 렌더링 하고, 각각의 게시물 카드에는 게시물 데이터를 props 전달합니다.
const Category = ({ searchParams }: any) => {
  const { subtitle } = searchParams; // 카테고리 쿼리
  const { postCards, loading } = usePostCards(subtitle); // 게시물 카드 state

  return (
    <div className={styles.category}>
      <h2>{subtitle || '전체 게시물'}</h2>

      {loading ? (
        <Spin size='m' message='게시물 목록을 불러오는 중입니다.' />
      ) : postCards ? (
        <ul className={styles.cardContainer}>
          {postCards.map((card: CardInterface) => {
            return <CardItem key={card.id} data={card} />;
          })}
        </ul>
      ) : (
        <div>게시물이 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default Category;
