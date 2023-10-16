import React, { Dispatch, SetStateAction, useState } from 'react';

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
const CategorySelector = ({
  categoryList,
  setMainCategoryId,
  selectedSubtitle,
  setSelectedSubtitle,
  isSelectCategoryVisible,
  setIsSelectCategoryVisible,
}: CategorySelectorPropsInterface) => {
  const [file, setFile] = useState<any>();

  const onFileUpload = async () => {
    /* FormData 선언 */
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    const data = await res.json(); // imgur 업로드 결과 데이터
    const { link } = data; // 이미지 링크

    return link;
  };

  const onFileChange = (e: any) => {
    setFile({ file: e.target.files[0] });
  };

  const handleSelectSubtitle = (subTitle: string, mainCategoryId: string) => {
    setMainCategoryId(mainCategoryId);
    setSelectedSubtitle(subTitle);
    setIsSelectCategoryVisible(false);
  };

  return (
    <div className={styles.categoryBox}>
      <button
        className={styles.selectedSubtitle}
        onClick={() => setIsSelectCategoryVisible(!isSelectCategoryVisible)}
        type='button'
      >
        {selectedSubtitle}
      </button>

      <input type='file' onChange={onFileChange} />
      <button onClick={onFileUpload} type='button'>
        upload
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
