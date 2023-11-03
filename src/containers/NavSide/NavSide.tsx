import { getServerSession } from 'next-auth';

import { CustomSession } from '@/types/session';

import styles from './NavSide.module.scss';
import BlogProfile from './components/BlogProfile/BlogProfile';
import NavSideBody from './components/NavSideBody/NavSideBody';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 사이드 메뉴 컴포넌트입니다.
const NavSide = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <nav className={styles.sideNav}>
      <BlogProfile session={session} />
      <NavSideBody />
    </nav>
  );
};

export default NavSide;
