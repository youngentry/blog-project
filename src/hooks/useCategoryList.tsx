import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { getCategoriesApi } from '@/services/categoryFetch';
import useLoading from './useLoading';
import { CommonCategoryInterface } from '@/types/types';

export interface UseCategoryInterface {
  categoryList: CommonCategoryInterface[];
  setCategoryList: Dispatch<SetStateAction<CommonCategoryInterface[]>>;
  loading?: boolean;
}

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useState<CommonCategoryInterface[]>([]); // 카테고리 목록
  const { loading } = useLoading(); // 로딩 상태

  useEffect(() => {
    (async () => {
      const res = await getCategoriesApi();

      // editor에 수정할 게시물 정보 불러오기
      if (res) {
        setCategoryList(res);
      }
    })();
  }, []);

  return { categoryList, setCategoryList, loading };
};

export default useCategoryList;
