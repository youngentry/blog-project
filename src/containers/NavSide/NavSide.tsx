import styles from './NavSide.module.scss';
import BlogProfile from './components/BlogProfile/BlogProfile';
import NavSideCategory from './components/NavSideCategory/NavSideCategory';

// 사이드 메뉴 컴포넌트입니다.
const NavSide = () => {
  return (
    <nav className={styles.sideNav}>
      <BlogProfile />
      <NavSideCategory />
    </nav>
  );
};

export default NavSide;
