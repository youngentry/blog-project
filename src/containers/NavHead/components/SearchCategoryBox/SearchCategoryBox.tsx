import Link from 'next/link';

import { SubCategoryInterface } from '@/types/types';

import styles from './SearchCategoryBox.module.scss';

interface PropsInterface {
  subTitleList: SubCategoryInterface[];
  closeSearchModal: () => void;
}

const SearchCategoryBox = (props: PropsInterface) => {
  const CATEGORY_SUBTITLE_QUERY_URL = '/category?subtitle=';

  const { subTitleList, closeSearchModal } = props;
  return (
    <div className={styles.searchCategoryBox}>
      <h3 className={styles.categoryHead}>게시물 카테고리</h3>
      <ul className={styles.categoryList}>
        {subTitleList.map((subCategory: SubCategoryInterface) => {
          return (
            <li key={subCategory._id as string} className={styles.categoryItem}>
              <button type='button' onClick={closeSearchModal}>
                <Link className={styles.categoryLink} href={`${CATEGORY_SUBTITLE_QUERY_URL}${subCategory.title}`}>
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
