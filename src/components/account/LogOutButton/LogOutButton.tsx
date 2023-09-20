"use client";

import { signOut } from "next-auth/react";

// 로그아웃 버튼 클릭 시 next-auth 로그아웃을 수행합니다.
const LogOutButton = () => {
  return <button onClick={() => signOut()}>로그아웃</button>;
};

export default LogOutButton;
