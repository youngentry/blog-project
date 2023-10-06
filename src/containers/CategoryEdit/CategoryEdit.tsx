"use client";

import React from "react";
import styles from "./CategoryEdit.module.scss";
import AddMainCategoryForm from "./components/AddMainCategoryForm/AddMainCategoryForm";
import CategoryList from "./components/CategoryList/CategoryList";

const CategoryEdit = () => {
  return (
    <div className={styles.container}>
      <h2>카테고리 에딧 페이지 제목</h2>
      <AddMainCategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryEdit;
