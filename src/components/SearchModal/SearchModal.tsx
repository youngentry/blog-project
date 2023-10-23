'use client';

import { BsSearch, BsX } from 'react-icons/bs';
import Link from 'next/link';

import useCategoryList, { UseCategoryInterface } from '@/hooks/useCategoryList';
import { CommonCategoryInterface, SubCategoryInterface } from '@/types/types';

import styles from './SearchModal.module.scss';

const SearchModal = () => {
  const { categoryList }: UseCategoryInterface = useCategoryList();

  const subTitleList: CommonCategoryInterface[] = categoryList.map((category) => category.children || []).flat();

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <button className={styles.closeModalButton} type='button'>
          <BsX />
        </button>
        <div className={styles.searchBar}>
          <i className={styles.searchIcon}>
            <BsSearch />
          </i>
          <input className={styles.searchInput} type='text' placeholder='검색어를 입력해주세요.' />
        </div>
        <div className={styles.categoryBox}>
          <h3 className={styles.categoryHead}>카테고리</h3>
          <ul className={styles.categoryList}>
            {subTitleList.map((subCategory: SubCategoryInterface) => {
              return (
                <li key={subCategory._id as string} className={styles.categoryItem}>
                  <Link className={styles.categoryLink} href={`/category?subtitle=${subCategory.title}`}>
                    {subCategory.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
