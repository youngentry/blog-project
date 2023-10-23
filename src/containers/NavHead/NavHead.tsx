import styles from './NavHead.module.scss';
import BlogTitle from './components/BlogTitle/BlogTitle';
import OpenSideMenuButton from './components/OpenSideMenuButton/OpenSideMenuButton';
import BlogFunctions from './components/BlogFunctions/BlogFunctions';
import SearchModal from '@/components/SearchModal/SearchModal';

// 상단 네비게이션 컴포넌트입니다.
const NavHead = async () => {
  return (
    <header className={styles.container}>
      <SearchModal />
      <nav className={styles.navigationBar}>
        <OpenSideMenuButton />
        <BlogTitle />
        <BlogFunctions />
      </nav>
    </header>
  );
};

export default NavHead;
