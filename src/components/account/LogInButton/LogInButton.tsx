"use client";

import { signIn } from "next-auth/react";

const LogInButton = () => {
  return <button onClick={() => signIn()}>소셜 로그인</button>;
};

export default LogInButton;
