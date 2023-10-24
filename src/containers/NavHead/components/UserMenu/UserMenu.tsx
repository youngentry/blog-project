'use client';

import React, { useRef, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';

import useClickOutside from '@/hooks/useClickOutside';
import { UserSessionData } from '@/types/session';

import styles from './UserMenu.module.scss';
import UserProfile from '@/components/UserProfile/UserProfile';
import LogOutButton from '@/components/buttons/LogOutButton/LogOutButton';
import LogInButton from '@/components/buttons/LogInButton/LogInButton';
import Notice from '@/components/notices/Notice';

/**
 * 블로그 유저 메뉴 컴포넌트입니다.
 * @param {UserSessionData} session
 * @returns
 */
const UserMenu = ({ session }: { session: UserSessionData | null }) => {
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false); // 메뉴 visible 여부

  // 유저 프로필 클릭 시 menu visible 상태를 토글합니다.
  const toggleUserMenuVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // 메뉴 모달의 바깥쪽을 눌렀을 때 창 닫기
  useClickOutside(userMenuRef, false, setIsMenuVisible);

  return (
    <div className={styles.userMenus} ref={userMenuRef}>
      <button className={styles.thumbnail} onClick={toggleUserMenuVisible} type='button'>
        <UserProfile session={session} />
      </button>
      <ul className={`${styles.menuList} ${isMenuVisible && 'visible'}`}>
        {session && (
          <>
            <li className={`${styles.accountSetting} ${styles.menuItem}`}>
              <strong>{session.user.name}</strong>
              <p className={styles.userId}>
                <span>{session.user.email}</span>
                <button className={styles.manageAccountButton} type='button'>
                  계정 관리
                  <div className={styles.notice}>
                    <Notice boxPosition='right'>계정 관리기능은 개발 중입니다.</Notice>
                  </div>
                </button>
              </p>
            </li>
            <li className={`${styles.myList} `}>
              <ul className={`${styles.myListItemBox} ${styles.menuItem}`}>
                <GoToListButton linkTo='likes' description='좋아요 한 게시물' />
                <GoToListButton linkTo='comments' description='작성한 댓글' />
              </ul>
            </li>
          </>
        )}
        <li className={`${styles.logout} ${styles.menuItem}`}>{session ? <LogOutButton /> : <LogInButton />}</li>
      </ul>
    </div>
  );
};

const GoToListButton = ({ linkTo, description }: { linkTo: string; description: string }) => {
  return (
    <li className={styles.myListItem}>
      <Link href={`/manage/${linkTo}`}>{description}</Link>
      <i>
        <BsChevronRight />
      </i>
    </li>
  );
};

export default UserMenu;
