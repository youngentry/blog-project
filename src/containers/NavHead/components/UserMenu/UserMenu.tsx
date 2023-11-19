'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';

import useClickOutside from '@/hooks/useClickOutside';
import { CustomSession } from '@/types/session';
import { useIsUserLoggedIn, useUserSessionAtom } from '@/jotai/userAtom';

import styles from './UserMenu.module.scss';
import UserProfile from '@/components/UserProfile/UserProfile';
import LogOutButton from '@/components/buttons/LogOutButton/LogOutButton';
import LogInButton from '@/components/buttons/LogInButton/LogInButton';
import Notice from '@/components/notices/Notice';

const LinkButton = ({ linkTo, description, chevron }: { linkTo: string; description: string; chevron?: boolean }) => {
  return (
    <li className={styles.myListItem}>
      <Link href={`${linkTo}`}>{description}</Link>
      {chevron && (
        <i>
          <BsChevronRight />
        </i>
      )}
    </li>
  );
};

/**
 * 블로그 유저 메뉴 컴포넌트입니다.
 * @param {CustomSession} session
 * @returns
 */
const UserMenu = ({ session }: { session: CustomSession | null }) => {
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { userSession, setUserSession } = useUserSessionAtom();

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false); // 메뉴 visible 여부

  useEffect(() => {
    setUserSession(session?.user || null);
  }, [session, setUserSession]);

  // 유저 프로필 클릭 시 menu visible 상태를 토글합니다.
  const toggleUserMenuVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // 메뉴 모달의 바깥쪽을 눌렀을 때 창 닫기
  useClickOutside(userMenuRef, setIsMenuVisible);

  return (
    <div className={styles.userMenus} ref={userMenuRef}>
      <button className={styles.thumbnail} onClick={toggleUserMenuVisible} type='button'>
        <UserProfile isLoggedIn={!!session} />
      </button>
      <ul className={`${styles.menuList} ${isMenuVisible && 'visible'}`}>
        {userSession && (
          <>
            <li className={`${styles.accountSetting} ${styles.menuItem}`}>
              <strong>{userSession.name}</strong>
              <p className={styles.userId}>
                <span>{userSession.email}</span>
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
                <LinkButton linkTo='/manage/comments' description='작성한 댓글' chevron />
                <LinkButton linkTo='/manage/likes' description='좋아요 한 게시물' chevron />
              </ul>
            </li>
          </>
        )}
        <div className={`${styles.logout} ${styles.menuItem}`}>
          {session ? (
            <LogOutButton />
          ) : (
            <>
              <LogInButton />
              <LinkButton linkTo='/register' description='회원가입' />
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default UserMenu;
