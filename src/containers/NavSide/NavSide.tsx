import styles from "./NavSide.module.scss";
import NavSideBody from "./NavSideBody/NavSideBody";
import NavSideHeader from "./NavSideHeader/NavSideHeader";

// 사이드 메뉴 컴포넌트입니다.
const NavSide = () => {
  return (
    <aside>
      <nav className={styles.sideNav}>
        <NavSideHeader />
        <NavSideBody />
      </nav>
    </aside>
  );
};

export default NavSide;
