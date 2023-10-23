import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';

import { getCategoryPostCountApi } from '@/services/categoryFetch';
import useCategories from '@/hooks/useMainCategories';
import SubCategoryList from '@/containers/CategoryEdit/components/SubCategoryList/SubCategoryList';

import Spin from '@/components/loadings/Spin/Spin';
import styles from './SideCategories.module.scss';

const SideCategories = () => {
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

  // 로딩 중일 때 표시되는 컴포넌트
  if (loading) {
    return (
      <div className={styles.container}>
        <Spin size='s' />
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      <li>
        <Link href='/category'>
          <h2>
            <strong>전체 보기</strong>
            <span>{subtitles.length}</span>
          </h2>
        </Link>
      </li>
      {categories.map((main) => {
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
      })}
    </ul>
  );
};

export default SideCategories;
