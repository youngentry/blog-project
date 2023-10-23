import { BsGear } from 'react-icons/bs';
import Link from 'next/link';

import styles from './ManageBlogButton.module.scss';

const ManageBlogButton = () => {
  return (
    <Link className={styles.manageBlogButton} href='/manage/category'>
      <BsGear />
    </Link>
  );
};

export default ManageBlogButton;
