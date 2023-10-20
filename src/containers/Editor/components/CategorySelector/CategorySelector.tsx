import React, { Dispatch, SetStateAction } from 'react';
import { BsChevronDown } from 'react-icons/bs';

import { CommonCategoryInterface, SubCategoryInterface } from '@/types/types';

import styles from './CategorySelector.module.scss';

// postEditor 카테고리 선택
interface CategorySelectorPropsInterface {
  categoryList: CommonCategoryInterface[];
  setMainCategoryId: Dispatch<SetStateAction<string>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
  isSelectCategoryVisible: boolean;
  setIsSelectCategoryVisible: Dispatch<SetStateAction<boolean>>;
}

// 게시물 작성 시 카테고리 선택 드롭메뉴
const CategorySelector = (props: CategorySelectorPropsInterface) => {
  const {
    categoryList,
    setMainCategoryId,
    selectedSubtitle,
    setSelectedSubtitle,
    isSelectCategoryVisible,
    setIsSelectCategoryVisible,
  } = props;

  // 카테고리 선택 시 이벤트
  const handleSelectSubtitle = (subTitle: string, mainCategoryId: string) => {
    setMainCategoryId(mainCategoryId);
    setSelectedSubtitle(subTitle);
    setIsSelectCategoryVisible(false);
  };

  return (
    <div className={styles.categoryBox}>
      <button
        className={styles.selectedSubtitleBox}
        onClick={() => setIsSelectCategoryVisible(!isSelectCategoryVisible)}
        type='button'
      >
        <p className={styles.selectedSubtitle}>{selectedSubtitle}</p>
        <BsChevronDown />
      </button>
      <div className={`${styles.categoryList} ${!isSelectCategoryVisible && 'hide'}`}>
        {categoryList.map((mainCategory: CommonCategoryInterface) => {
          const children = mainCategory.children as SubCategoryInterface[];

          return mainCategory ? (
            <div key={mainCategory._id as string}>
              <p className={`${styles.mainCategory}`}>{mainCategory.title}</p>
              <ul>
                {children?.length &&
                  children.map((subCategory) => {
                    return (
                      <button
                        key={subCategory._id as string}
                        className={styles.subCategory}
                        onClick={() => handleSelectSubtitle(subCategory.title, mainCategory._id as string)}
                        type='button'
                      >
                        - {subCategory.title}
                      </button>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <div>카테고리가 없습니다.</div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
