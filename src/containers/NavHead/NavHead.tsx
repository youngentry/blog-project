import React from "react";
import styles from "./NavHead.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogOutButton from "@/components/account/LogOutButton/LogOutButton";
import LogInButton from "@/components/account/LogInButton/LogInButton";

// 상단 네비게이션 컴포넌트입니다.
const NavHead = async () => {
  // 로그인 유무를 통해 로그아웃, 로그인 버튼을 조건부 렌더링합니다.
  let session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <header className={styles.container}>
      <nav>
        <h2>블로그</h2>
        <div>{session ? <LogOutButton /> : <LogInButton />}</div>
      </nav>
    </header>
  );
};

export default NavHead;
