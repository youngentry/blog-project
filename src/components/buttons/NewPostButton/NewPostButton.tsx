import Link from 'next/link';
import { BsPencil } from 'react-icons/bs';

import styles from './NewPostButton.module.scss';

// 새 글 작성 페이지로 이동합니다.
const NewPostButton = () => {
  return (
    <Link href='/manage/newpost'>
      <i className={styles.newPostButton}>
        <BsPencil />
      </i>
    </Link>
  );
};

export default NewPostButton;
