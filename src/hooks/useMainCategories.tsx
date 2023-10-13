'use client';

import React, { useState, useEffect } from 'react';
import useLoading from './useLoading';
import { getCategoriesApi } from '@/services/categoryFetch';

const useMainCategories = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const { loading, setLoading } = useLoading();

  // 작성한 댓글 리스트를 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const mainCategories = await getCategoriesApi('main');
        // 불러온 댓글 리스트를 state에 저장합니다.
        setMainCategories(mainCategories);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { mainCategories, setMainCategories, loading };
};

export default useMainCategories;
