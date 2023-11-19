import React from 'react';
import Image from 'next/image';

import styles from './UserProfile.module.scss';

/**
 * 유저 프로필 이미지 컴포넌트입니다.
 */
const UserProfile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Image
      className={styles.profile}
      alt='user thumbnail'
      src={`/images/thumbnail/${isLoggedIn ? 'fox.jpg' : 'guest.jpg'}`}
      width={40}
      height={40}
    />
  );
};

export default UserProfile;
