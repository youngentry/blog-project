"use client";

import { signIn } from "next-auth/react";

// 로그인 버튼 클릭 시 next-auth 로그인을 수행합니다.
const LogInButton = () => {
  return <button onClick={() => signIn()}>소셜 로그인</button>;
};

export default LogInButton;
