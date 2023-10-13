import React, { useEffect, useState } from 'react';
import styles from './CategoryList.module.scss';
import { getCategoriesApi } from '@/services/categoryFetch';
import AddSubCategoryForm from '../AddSubCategoryForm/AddSubCategoryForm';
import SubCategoryList from '../SubCategoryList/SubCategoryList';

const CategoryList = () => {
  const [mainCategories, setMainCategories] = useState<any[]>([]);

  useEffect(() => {
    const getMainCategories = async () => {
      const res = await getCategoriesApi('main');

      // 메인 카테고리 조회 성공 시 메인 카테고리 목록 반환
      if (res) {
        return res;
      }
    };

    (async () => {
      const mainCategoryData = await getMainCategories();
      setMainCategories(mainCategoryData);
    })();
  }, []);

  return (
    <div className={styles.categoryBox}>
      <h3>카테고리 박스</h3>
      <ul className={styles.mainTitleBox}>
        {mainCategories.map((main) => {
          const { _id, title } = main;
          return (
            <li key={_id} className={styles.mainTitleItem}>
              <h4>{title}</h4>
              <AddSubCategoryForm _id={_id} />
              <SubCategoryList _id={_id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
