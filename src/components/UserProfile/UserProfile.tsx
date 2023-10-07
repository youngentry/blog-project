import React from "react";
import styles from "./UserProfile.module.scss";
import Image from "next/image";

/**
 * 유저 프로필 이미지 컴포넌트입니다.
 * @param {UserSessionData} session
 * @returns
 */
const UserProfile = ({ session }: { session: UserSessionData | null }) => {
  return (
    <Image
      className={styles.profile}
      alt="user thumbnail"
      src={`/images/thumbnail/${session ? "fox.jpg" : "guest.jpg"}`}
      width={40}
      height={40}
    ></Image>
  );
};

export default UserProfile;
