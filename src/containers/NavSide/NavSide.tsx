import { getServerSession } from 'next-auth';

import { CustomSession } from '@/types/session';
import { checkIsBlogAdmin, checkIsBlogManager } from '@/utils/sessionCheck/checkUserRole';

import styles from './NavSide.module.scss';
import BlogProfile from './components/BlogProfile/BlogProfile';
import NavSideBody from './components/NavSideBody/NavSideBody';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 사이드 메뉴 컴포넌트입니다.
const NavSide = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const isBlogAdmin = checkIsBlogAdmin(session?.user?.role);
  const isBlogManager = checkIsBlogManager(session?.user?.role);
  return (
    <nav className={styles.sideNav}>
      <BlogProfile isBlogManager={isBlogManager} />
      <NavSideBody isBlogAdmin={isBlogAdmin} />
    </nav>
  );
};

export default NavSide;
