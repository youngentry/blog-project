import React from "react";
import styles from "./NavHead.module.scss";
import { getServerSession } from "next-auth";
import LogOutButton from "@/components/buttons/LogOutButton/LogOutButton";
import LogInButton from "@/components/buttons/LogInButton/LogInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BsChevronRight, BsGrid, BsPencil, BsSearch } from "react-icons/bs";
import Image from "next/image";
import Notice from "@/components/notices/Notice";
import BlogTitle from "./components/BlogTitle/BlogTitle";
import OpenSideMenuButton from "./components/OpenSideMenuButton/OpenSideMenuButton";
import BlogFunctions from "./components/BlogFunctions/BlogFunctions";

// 상단 네비게이션 컴포넌트입니다.
const NavHead = async () => {
  return (
    <header className={styles.container}>
      <nav className={styles.navigationBar}>
        <OpenSideMenuButton />
        <BlogTitle />
        <BlogFunctions />
      </nav>
    </header>
  );
};

export default NavHead;
