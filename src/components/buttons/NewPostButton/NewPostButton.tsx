'use client';

import { BsPencil } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

import styles from './NewPostButton.module.scss';

// 새 글 작성 페이지로 이동합니다.
const NewPostButton = () => {
  const router = useRouter();

  return (
    <button
      className={styles.newPostButton}
      onClick={() => {
        router.push('/manage/newpost');
      }}
      type='button'
    >
      <BsPencil />
    </button>
  );
};

export default NewPostButton;
