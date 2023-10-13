import React from 'react';
import styles from './SearchPostButton.module.scss';
import { BsSearch } from 'react-icons/bs';
import Notice from '@/components/notices/Notice';

const SearchPostButton = ({ boxPosition }: { boxPosition: string }) => {
  return (
    <button className={styles.searchPostButton}>
      <BsSearch />
      <div className={styles.notice}>
        <Notice boxPosition={boxPosition}>개발 중입니다.</Notice>
      </div>
    </button>
  );
};

export default SearchPostButton;
