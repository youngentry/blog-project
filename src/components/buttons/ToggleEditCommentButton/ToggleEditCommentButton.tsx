import React, { Dispatch, SetStateAction } from 'react';

import styles from './ToggleEditCommentButton.module.scss';

export interface ToggleEditCommentButtonPropsInterface {
  isLoggedIn?: boolean;
  commentId?: string;
  comment?: string;
  setEditingCommentId: Dispatch<SetStateAction<string>>;
  setEditCommentInput: Dispatch<SetStateAction<string>>;
}

const ToggleEditCommentButton = (props: ToggleEditCommentButtonPropsInterface) => {
  const { isLoggedIn, commentId, comment, setEditingCommentId, setEditCommentInput } = props;

  // "수정 버튼 클릭" 이벤트
  const handleClickToggleEditButton = async (_id: string, originComment: string) => {
    setEditingCommentId(_id); // 수정할 댓글 id
    setEditCommentInput(originComment); // 수정할 댓글 불러오기
  };

  return (
    <button
      className={`${styles.editButton} ${!isLoggedIn && 'hide'}`}
      onClick={() => handleClickToggleEditButton(commentId as string, comment as string)}
      type='button'
    >
      수정
    </button>
  );
};

export default ToggleEditCommentButton;
