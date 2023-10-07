import React from "react";
import styles from "./BlogFunctions.module.scss";
import NewPostButton from "@/components/buttons/NewPostButton/NewPostButton";
import SearchPostButton from "@/components/buttons/SearchPostButton/SearchPostButton";
import UserMenus from "../UserMenus/UserMenus";

/**
 * 상단 네비게이션 우측 메뉴 모음 컴포넌트입니다.
 */
const BlogFunctions = async () => {
  return (
    <div className={styles.blogFunctions}>
      <SearchPostButton />
      <NewPostButton />
      <UserMenus />
    </div>
  );
};

export default BlogFunctions;
