'use client';

import React from 'react';
import { BsPencil } from 'react-icons/bs';
import styles from './NewPostButton.module.scss';
import { useRouter } from 'next/navigation';

const NewPostButton = () => {
  const router = useRouter();

  return (
    <button
      className={styles.newPostButton}
      onClick={() => {
        router.push('/manage/newpost');
      }}
    >
      <BsPencil />
    </button>
  );
};

export default NewPostButton;
