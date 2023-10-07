import React from "react";
import styles from "./UserMenus.module.scss";
import UserProfile from "@/components/UserProfile/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BsChevronRight } from "react-icons/bs";
import LogOutButton from "@/components/buttons/LogOutButton/LogOutButton";
import LogInButton from "@/components/buttons/LogInButton/LogInButton";

const UserMenus = async () => {
  // 로그인 유무를 통해 로그아웃, 로그인 버튼을 조건부 렌더링합니다.
  let session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <div className={styles.userMenus}>
      <UserProfile session={session} />
      <ul className={styles.menuList}>
        {session && (
          <>
            <li className={`${styles.accountSetting} ${styles.menuItem}`}>
              <strong>{session.user.name}</strong>
              <p className={styles.userId}>
                <span>{session.user.email}</span>
                <button>계정 관리</button>
              </p>
            </li>
            <li className={`${styles.myList} `}>
              <ul className={`${styles.myListItemBox} ${styles.menuItem}`}>
                <li className={styles.myListItem}>
                  <p>좋아요 한 게시물</p>
                  <i>
                    <BsChevronRight />
                  </i>
                </li>
                <li className={styles.myListItem}>
                  <p>작성한 댓글</p>
                  <i>
                    <BsChevronRight />
                  </i>
                </li>
              </ul>
            </li>
          </>
        )}
        <li className={`${styles.logout} ${styles.menuItem}`}>
          {session ? <LogOutButton /> : <LogInButton />}
        </li>
      </ul>
    </div>
  );
};

export default UserMenus;
