import React from "react";
import styles from "./OpenSideMenuButton.module.scss";
import { BsGrid } from "react-icons/bs";
import Notice from "@/components/notices/Notice";

/**
 * 상단 네비게이션 좌측의 사이드 메뉴 오픈 버튼입니다.
 */
const OpenSideMenuButton = () => {
  return (
    <div className={styles.container}>
      <button className={styles.openMenuButton}>
        <BsGrid />
        <div className={styles.notice}>
          <Notice boxPosition="left">사이드 메뉴 열기</Notice>
        </div>
      </button>
    </div>
  );
};

export default OpenSideMenuButton;
