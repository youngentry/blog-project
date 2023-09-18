"use client";

import { useRouter } from "next/navigation";
import React from "react";

const EditPostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/manage/newpost/${postId}`);
      }}
    >
      수정
    </button>
  );
};

export default EditPostButton;
