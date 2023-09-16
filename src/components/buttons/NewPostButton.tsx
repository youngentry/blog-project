"use client";

import { useRouter } from "next/navigation";
import React from "react";

const NewPostButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/manage/newpost");
      }}
    >
      글쓰기
    </button>
  );
};

export default NewPostButton;
