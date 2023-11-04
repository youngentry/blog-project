'use client';

import { usePathname } from 'next/navigation';

import styles from './NavSideBody.module.scss';
import SideCategories from '../SideCategories/SideCategories';
import ManageMenus from '../ManagementMenus/ManagementMenus';

// 사이드 메뉴의 바디 컴포넌트입니다.
const NavSideBody = ({ isBlogAdmin }: { isBlogAdmin: boolean }) => {
  const pathname = usePathname();

  // 카테고리 메뉴를 refetch하지 않도록 삼항연산자 대신 css로 visible 여부를 결정합니다. (unmount 방지)
  const isManagePage = pathname.startsWith('/manage') && !pathname.startsWith('/manage/newpost');
  return (
    <div className={styles.container}>
      <div className={`${styles.currentMenu} ${isManagePage && 'visible'}`}>
        <ManageMenus isBlogAdmin={isBlogAdmin} />
      </div>
      <div className={`${styles.currentMenu} ${!isManagePage && 'visible'}`}>
        <SideCategories />
      </div>
    </div>
  );
};

export default NavSideBody;
