import { BsGrid } from 'react-icons/bs';

import styles from './OpenSideMenuButton.module.scss';
import Notice from '@/components/notices/Notice';

/**
 * 상단 네비게이션 좌측의 사이드 메뉴 오픈 버튼입니다.
 */
const OpenSideMenuButton = () => {
  return (
    <div className={styles.container}>
      <button className={styles.openMenuButton} type='button'>
        <BsGrid />
        <div className={styles.notice}>
          <Notice boxPosition='left'>개발 중입니다</Notice>
        </div>
      </button>
    </div>
  );
};

export default OpenSideMenuButton;
