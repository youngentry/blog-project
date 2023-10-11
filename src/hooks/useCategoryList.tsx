import { CommonCategoryType } from "@/containers/Editor/PostEditor";
import { getCategoriesApi } from "@/services/categoryFetch";
import React, { useEffect, useState } from "react";
import useLoading from "./useLoading";

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useState<CommonCategoryType[]>([]); // 카테고리 목록
  const { loading, setLoading } = useLoading(); // 로딩 상태

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
