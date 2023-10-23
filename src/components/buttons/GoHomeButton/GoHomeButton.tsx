import { BsHouseDoor } from 'react-icons/bs';
import Link from 'next/link';

import styles from './GoHomeButton.module.scss';

const GoHomeButton = () => {
  return (
    <Link className={styles.homeButton} href='/'>
      <BsHouseDoor />
    </Link>
  );
};

export default GoHomeButton;
