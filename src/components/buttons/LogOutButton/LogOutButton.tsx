'use client';

import { signOut } from 'next-auth/react';
import styles from './LogOutButton.module.scss';

// 로그아웃 버튼 클릭 시 next-auth 로그아웃을 수행합니다.
const LogOutButton = () => {
  return (
    <button className={styles.logout} onClick={() => signOut()}>
      로그아웃
    </button>
  );
};

export default LogOutButton;
