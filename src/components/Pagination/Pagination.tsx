import React from 'react';

import styles from './Pagination.module.scss';

// 페이지네이션입니다.
const Pagination = () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => {
        return (
          <li key={page} className={styles.pageNumber}>
            {page}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
