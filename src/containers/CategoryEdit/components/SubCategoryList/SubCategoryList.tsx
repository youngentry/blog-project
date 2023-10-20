'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCircleFill } from 'react-icons/bs';

import { getCategoriesApi } from '@/services/categoryFetch';
import { SubCategoryInterface } from '@/types/types';

import styles from './SubCategoryList.module.scss';

// 서브 카테고리 리스트
const SubCategoryList = ({ mainCategoryId, subtitles }: { mainCategoryId: string; subtitles?: string[] }) => {
  const [subCategories, setSubCategories] = useState<SubCategoryInterface[]>([]);

  useEffect(() => {
    const getSubCategories = async (parentId: string) => {
      const res = await getCategoriesApi('sub', parentId);
      // 메인 카테고리 조회 성공 시 메인 카테고리 목록 반환
      if (res) {
        return res.children;
      }

      return [];
    };

    (async () => {
      const subCategoryData = await getSubCategories(mainCategoryId);
      setSubCategories(subCategoryData);
    })();
  }, [mainCategoryId]);

  return (
    <ul className={styles.subTitleBox}>
      {subCategories.map((sub) => {
        const { title } = sub;
        const subCategoryId = String(sub._id);
        const postCount = subtitles?.filter((subtitle) => subtitle === title).length;
        return (
          <li key={subCategoryId} className={styles.subTitleItem}>
            <Link href={{ pathname: '/category', query: { subtitle: title } }}>
              <h5>
                <strong className={styles.subtitle}>
                  <i className={styles.subtitleLeftDot}>
                    <BsCircleFill />
                  </i>
                  {title}
                </strong>
                <span className={styles.postCount}>{postCount}</span>
              </h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubCategoryList;
