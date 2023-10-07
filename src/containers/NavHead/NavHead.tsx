import React from "react";
import styles from "./NavHead.module.scss";
import { getServerSession } from "next-auth";
import LogOutButton from "@/components/buttons/LogOutButton/LogOutButton";
import LogInButton from "@/components/buttons/LogInButton/LogInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BsChevronRight, BsGrid, BsPencil, BsSearch } from "react-icons/bs";
import Image from "next/image";
import Notice from "@/components/notices/Notice";

// 상단 네비게이션 컴포넌트입니다.
const NavHead = async () => {
  // 로그인 유무를 통해 로그아웃, 로그인 버튼을 조건부 렌더링합니다.
  let session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <header className={styles.container}>
      <nav className={styles.navigationBar}>
        <div className={styles.menuLeft}>
          <button className={styles.openMenuButton}>
            <BsGrid />
            <div className={styles.notice}>
              <Notice boxPosition="left">사이드 메뉴 열기</Notice>
            </div>
          </button>
        </div>
        <div className={styles.menuCenter}>
          <h2>{`Youngentry's Blog`}</h2>
        </div>
        <div className={styles.menuRight}>
          <button className={styles.searchButton}>
            <BsSearch />
            <div className={styles.notice}>
              <Notice boxPosition="right">개발중인 기능입니다.</Notice>
            </div>
          </button>
          <button className={styles.writePostButton}>
            <BsPencil />
            <div className={styles.notice}>
              <Notice boxPosition="right">글쓰기</Notice>
            </div>
          </button>
          <div className={styles.userMenuBox}>
            <Image
              className={styles.profile}
              alt="user thumbnail"
              src={`/images/thumbnail/${session ? "fox.jpg" : "guest.jpg"}`}
              width={40}
              height={40}
            ></Image>
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
        </div>
      </nav>
    </header>
  );
};

export default NavHead;
