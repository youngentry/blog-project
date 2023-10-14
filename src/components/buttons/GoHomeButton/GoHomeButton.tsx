import React from 'react';
import { BsHouseDoor } from 'react-icons/bs';
import Link from 'next/link';

import styles from './GoHomeButton.module.scss';

const GoHomeButton = () => {
  return (
    <button className={styles.homeButton} type='button'>
      <Link href='/'>
        <BsHouseDoor />
      </Link>
    </button>
  );
};

export default GoHomeButton;
