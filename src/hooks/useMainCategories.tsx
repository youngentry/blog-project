'use client';

import { useState, useEffect } from 'react';

import useLoading from './useLoading';
import { getCategoriesApi } from '@/services/categoryFetch';
import { CommonCategoryInterface } from '@/types/types';

const useCategories = () => {
  const [categories, setMainCategories] = useState<CommonCategoryInterface[]>([]);
  const { loading, setLoading } = useLoading();

  // 작성한 댓글 리스트를 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const categoriesResponse = await getCategoriesApi('main');
        // 불러온 댓글 리스트를 state에 저장합니다.
        setMainCategories(categoriesResponse);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setLoading]);

  return { categories, setMainCategories, loading };
};

export default useCategories;
