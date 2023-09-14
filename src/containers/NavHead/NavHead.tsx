import React from "react";
import styles from "./NavHead.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogOutButton from "@/components/account/LogOutButton/LogOutButton";
import LogInButton from "@/components/account/LogInButton/LogInButton";

const NavHead = async () => {
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
