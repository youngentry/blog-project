'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import usePostCards, { UsePostCardsInterface } from '@/hooks/usePostCards';

import styles from './Category.module.scss';
import Spin from '@/components/loadings/Spin/Spin';
import CardItem from './components/Card/CardItem';

// category (게시물 목록)페이지입니다.
const Category = () => {
  const title = useSearchParams().get('title') || ''; // 게시물 제목
  const subtitle = useSearchParams().get('subtitle') || ''; // 카테고리 이름
  const author = useSearchParams().get('author') || ''; // 작성자 이름

  const { postCards, loading }: UsePostCardsInterface = usePostCards(title, subtitle, author); // 게시물 카드 state

  // 데이터를 로드하는 중에 표시할 화면
  if (loading) {
    return (
      <div className={styles.category}>
        <Head title={title} subtitle={subtitle} author={author} />
        <Spin size='s' message='게시물 목록을 불러오는 중입니다.' />
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

const Head = ({ title, subtitle, author }: { title: string; subtitle: string; author: string }) => {
  // debt: title+subtitle, title+author 기능 등 복합 검색도 가능하지만 렌더링 결과는 보류
  if (title) return <h2>{`"${title}"`} 검색 결과</h2>; // 글 제목
  if (subtitle) return <h2>{`${subtitle}`}</h2>; // 카테고리
  if (author) return <h2>{`"${author}"`}님의 게시물</h2>; // 글 작성자
  return <h2>전체 게시물</h2>;
};

export default Category;
