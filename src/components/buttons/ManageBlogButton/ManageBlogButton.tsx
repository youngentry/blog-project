import { BsGear } from 'react-icons/bs';
import Link from 'next/link';

import styles from './ManageBlogButton.module.scss';

const ManageBlogButton = () => {
  return (
    <Link href='/manage/comments'>
      <i className={styles.manageBlogButton}>
        <BsGear />
      </i>
    </Link>
  );
};

export default ManageBlogButton;
