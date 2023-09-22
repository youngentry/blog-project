"use client";

import { useRouter } from "next/navigation";
import React from "react";

// 삭제하기 버튼을 클릭하면 해당 게시물 삭제합니다.
const DeletePostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleClickDeleteButton = async () => {
    // 삭제 요청 api
    const response = await fetch(`/api/manage/posts/${postId}`, { method: "DELETE" });

    // 삭제 확인 질문. "취소" 선택 시 함수 종료
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }

    // 삭제 요청 결과가 유효하지 않은 경우 '/'로 redirect 시킵니다.
    if (response.status === 400) {
      window.alert("유효한 접근이 아닙니다.");
      router.push("/");
    }

    // 삭제 요청 결과가 유효한 경우 '/category'로 redirect 시킵니다.
    if (response.status === 200) {
      window.alert("게시글이 삭제되었습니다.");
      router.push("/category");
      router.refresh();
    }
  };

  return <button onClick={() => handleClickDeleteButton()}>삭제</button>;
};

export default DeletePostButton;
