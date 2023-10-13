'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './EditPostButton.module.scss';

// 수정하기 버튼을 클릭하면 해당 게시물 수정 페이지로 이동합니다.
const EditPostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  return (
    <button
      className={styles.editPostButton}
      onClick={() => {
        router.push(`/manage/newpost/${postId}`);
      }}
    >
      수정
    </button>
  );
};

export default EditPostButton;
