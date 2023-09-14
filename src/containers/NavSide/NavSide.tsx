import styles from "./NavSide.module.scss";
import NavSideBody from "./NavSideBody/NavSideBody";
import NavSideHeader from "./NavSideHeader/NavSideHeader";

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
