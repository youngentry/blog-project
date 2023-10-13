'use client';

import { signIn } from 'next-auth/react';
import styles from './LogInButton.module.scss';

// 로그인 버튼 클릭 시 next-auth 로그인을 수행합니다.
const LogInButton = () => {
  return (
    <button className={styles.login} onClick={() => signIn()}>
      로그인
    </button>
  );
};

export default LogInButton;
