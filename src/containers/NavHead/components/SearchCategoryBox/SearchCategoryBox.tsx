import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

import { SubCategoryInterface } from '@/types/types';

import styles from './SearchCategoryBox.module.scss';

interface PropsInterface {
  subTitleList: SubCategoryInterface[];
  setIsVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const SearchCategoryBox = (props: PropsInterface) => {
  const { subTitleList, setIsVisibleModal } = props;
  return (
    <div className={styles.searchCategoryBox}>
      <h3 className={styles.head}>게시물 카테고리</h3>
      <ul className={styles.categoryList}>
        {subTitleList.map((subCategory: SubCategoryInterface) => {
          return (
            <li key={subCategory._id as string} className={styles.categoryItem}>
              <button type='button' onClick={() => setIsVisibleModal(false)}>
                <Link className={styles.categoryLink} href={`/category?subtitle=${subCategory.title}`}>
                  {subCategory.title}
                </Link>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchCategoryBox;
