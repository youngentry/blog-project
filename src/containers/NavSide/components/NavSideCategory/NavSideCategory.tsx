'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import { getCategoryPostCountApi } from '@/services/categoryFetch';
import useCategories from '@/hooks/useMainCategories';
import SubCategoryList from '@/containers/CategoryEdit/components/SubCategoryList/SubCategoryList';

import styles from './NavSideCategory.module.scss';
import Spin from '@/components/loadings/Spin/Spin';

// 사이드 메뉴의 바디 컴포넌트입니다.
const NavSideCategory = () => {
  const { categories, loading } = useCategories(); // category 배열
  const [subtitles, setSubtitles] = useState<string[]>([]); // subtitle 배열 ex) ["서브타이틀1", "서브타이틀2"]

  // 카테고리별 게시물 수 조회
  useEffect(() => {
    (async () => {
      const categoryPostCount = await getCategoryPostCountApi();

      if (categoryPostCount) {
        setSubtitles(categoryPostCount);
      }
    })();
  }, []);

  return (
    <ul className={styles.container}>
      <Link href='/category'>
        <h2>
          <strong>전체 보기</strong>
          <span>{subtitles.length}</span>
        </h2>
      </Link>
      {loading ? (
        <Spin size='s' />
      ) : (
        categories.map((main) => {
          const { _id, title } = main;
          const mainCategoryId = String(_id);
          return (
            <li key={mainCategoryId} className={styles.mainCategory}>
              <h4>
                <i className={styles.mainTitleIcon}>
                  <BsThreeDots />
                </i>
                <span>{title}</span>
              </h4>
              <SubCategoryList mainCategoryId={mainCategoryId} subtitles={subtitles} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default NavSideCategory;
