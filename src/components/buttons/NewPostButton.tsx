'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

// 수정하기 버튼을 클릭하면 해당 게시물 수정 페이지로 이동합니다.
const NewPostButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push('/manage/newpost');
      }}
      type='button'
    >
      글쓰기
    </button>
  );
};

export default NewPostButton;
