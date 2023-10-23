import React, { Dispatch, SetStateAction } from 'react';

import styles from './ToggleDeleteGuestCommentModalButton.module.scss';

export interface ToggleDeleteModalButtonPropsInterface {
  setCheckingGuestPassword: Dispatch<SetStateAction<boolean>>;
  setDeletingCommentId: Dispatch<SetStateAction<string>>;
  setEditCommentInput: Dispatch<SetStateAction<string>>;
  commentId?: string;
}

const ToggleDeleteGuestCommentModalButton = (props: ToggleDeleteModalButtonPropsInterface) => {
  const { setDeletingCommentId, setCheckingGuestPassword, setEditCommentInput, commentId } = props;

  // "게스트 댓글 삭제 버튼 클릭" 이벤트
  const handleClickToggleDeleteModalButton = (_id: string) => {
    setDeletingCommentId(_id); // 삭제확인 input 출력할 댓글 id
    setCheckingGuestPassword(true); // 삭제확인 input 출력
    setEditCommentInput(''); // 수정 중인 댓글 초기화
  };

  return (
    <button
      className={styles.deleteButton}
      onClick={() => handleClickToggleDeleteModalButton(commentId as string)}
      type='button'
    >
      삭제
    </button>
  );
};

export default ToggleDeleteGuestCommentModalButton;
