import React, { useState } from "react";
import styles from "./CategorySelector.module.scss";
import { CategorySelectorProps, CommonCategoryType, SubCategoryType } from "../../PostEditor";

const CategorySelector = ({
  categoryList,
  setCategoryId,
  isSelectCategoryVisible,
  setIsSelectCategoryVisible,
  selectedSubtitle,
  setSelectedSubtitle,
}: CategorySelectorProps) => {
  const [file, setFile] = useState<any>();

  const onFileUpload = async () => {
    /* FormData 선언 */
    const formData: any = new FormData();
    formData.append("file", file);

    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json(); // imgur 업로드 결과 데이터
    const link = data.link; // 이미지 링크

    return link;
  };

  const onFileChange = (e: any) => {
    setFile({ file: e.target.files[0] });
  };

  const handleSelectSubtitle = (subTitle: string, categoryId: string) => {
    setCategoryId(categoryId);
    setSelectedSubtitle(subTitle);
    setIsSelectCategoryVisible(false);
  };

  return (
    <div className={styles.categoryBox}>
      <div
        className={styles.selectedSubtitle}
        onClick={() => setIsSelectCategoryVisible(!isSelectCategoryVisible)}
      >
        {selectedSubtitle}
      </div>

      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>upload</button>
      <div className={`${styles.categoryList} ${!isSelectCategoryVisible && "hide"}`}>
        {categoryList.map((mainCategory: CommonCategoryType) => {
          const children = mainCategory.children as SubCategoryType[];

          return mainCategory ? (
            <div key={mainCategory._id as string}>
              <p className={`${styles.mainCategory}`}>{mainCategory.title}</p>
              <ul>
                {children?.length &&
                  children.map((subCategory) => {
                    return (
                      <p
                        key={subCategory._id as string}
                        className={styles.subCategory}
                        onClick={() =>
                          handleSelectSubtitle(subCategory.title, mainCategory._id as string)
                        }
                      >
                        - {subCategory.title}
                      </p>
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
