'use client';

import { usePathname } from 'next/navigation';

import styles from './NavSideBody.module.scss';
import SideCategories from '../SideCategories/SideCategories';
import ManageMenus from '../ManagementMenus/ManagementMenus';

// 사이드 메뉴의 바디 컴포넌트입니다.
const NavSideBody = () => {
  const pathname = usePathname();
  const isManagePage = pathname.startsWith('/manage');
  return <div className={styles.container}>{isManagePage ? <ManageMenus /> : <SideCategories />}</div>;
};

export default NavSideBody;
