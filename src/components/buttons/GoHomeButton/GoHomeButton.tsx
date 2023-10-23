import { BsHouseDoor } from 'react-icons/bs';
import Link from 'next/link';

import styles from './GoHomeButton.module.scss';

const GoHomeButton = () => {
  return (
    <Link href='/'>
      <i className={styles.homeButton}>
        <BsHouseDoor />
      </i>
    </Link>
  );
};

export default GoHomeButton;
