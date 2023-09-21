"use client";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { checkEditAuthor } from "@/utils/sessionCheck/checkEditAuthor";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";

// 삭제하기 버튼을 클릭하면 해당 게시물 삭제합니다.
const DeletePostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleClickDeleteButton = async () => {
    const response = await fetch(`/api/manage/posts/${postId}`, { method: "DELETE" });

    if (response.status === 400) {
      window.alert("유효한 접근이 아닙니다.");
      router.push("/");
    }

    if (response.status === 200) {
      window.alert("게시글이 삭제되었습니다.");
      router.push("/category");
      router.refresh();
    }
  };

  return <button onClick={() => handleClickDeleteButton()}>삭제</button>;
};

export default DeletePostButton;
