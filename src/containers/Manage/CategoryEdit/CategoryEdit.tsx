"use client";

import React, { useState } from "react";
import styles from "./CategoryEdit.module.scss";
import { CustomInput } from "@/components/inputs/CustomInputs/CustomInputs";
import { AddCategoryType, addCategoryApi } from "@/services/editCategoryFetch";
import AddMainCategoryForm from "./AddMainCategoryForm/AddMainCategoryForm";
import CategoryList from "./CategoryList/CategoryList";

const CategoryEdit = () => {
  // 1. 부모 카테고리 목록 << 직접 카테고리 편집에서 작성 해야함
  //    > 드래그 앤 드롭으로 순서 바꾸기 가능
  // 2. 부모 카테고리세 속한 서브 카테고리 목록(글자순 정렬) << 게시글 작성 시 추가됨
  //    > 게시글 작성 시 부모 카테고리 선택
  //      > 부모 카테고리에 포함된 서브 카테고리 추천 검색어 나타나기
  //        > 서브 카테고리 추천 검색어 선택 or 직접 작성하기

  // 3. 서브 카테고리에 속한 게시글 목록
  //    > 대표 이미지, 게시글 제목, 링크, 조회수, 좋아요 수, 댓글 수, 수정, 삭제

  return (
    <div className={styles.container}>
      <h2>카테고리 에딧 페이지 제목</h2>
      <AddMainCategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryEdit;
