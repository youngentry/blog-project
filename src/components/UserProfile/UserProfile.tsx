import React from 'react';
import styles from './UserProfile.module.scss';
import Image from 'next/image';

/**
 * 유저 프로필 이미지 컴포넌트입니다.
 * @param {UserSessionData} session
 * @returns
 */
const UserProfile = ({ session, isLoggedIn }: { session?: UserSessionData | null; isLoggedIn?: boolean }) => {
  return (
    <Image
      className={styles.profile}
      alt='user thumbnail'
      src={`/images/thumbnail/${session || isLoggedIn ? 'fox.jpg' : 'guest.jpg'}`}
      fill
    ></Image>
  );
};

export default UserProfile;
