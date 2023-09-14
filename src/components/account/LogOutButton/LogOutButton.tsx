"use client";

import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return <button onClick={() => signOut()}>로그아웃</button>;
};

export default LogOutButton;
