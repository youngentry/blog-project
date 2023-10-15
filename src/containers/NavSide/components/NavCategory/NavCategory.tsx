import { BsThreeDots } from 'react-icons/bs';

import SubCategoryList from '@/containers/CategoryEdit/components/SubCategoryList/SubCategoryList';
import useMainCategories from '@/hooks/useMainCategories';

import styles from './NavCategory.module.scss';
import Spin from '@/components/loadings/Spin/Spin';

const NavCategory = ({ subtitles }: { subtitles: string[] }) => {
  const { mainCategories, loading } = useMainCategories();

  return (
    <ul className={styles.container}>
      {loading ? (
        <Spin size='s' />
      ) : (
        mainCategories.map((main) => {
          const { _id, title } = main;
          return (
            <li key={_id} className={styles.mainCategory}>
              <h4>
                <i className={styles.mainTitleIcon}>
                  <BsThreeDots />
                </i>
                <span>{title}</span>
              </h4>
              <SubCategoryList _id={_id} subtitles={subtitles} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default NavCategory;
