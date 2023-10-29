import React, { Dispatch, SetStateAction } from 'react';

interface PropsInterface {
  commentId: string;
  replyingCommentId: string | null;
  setReplyingCommentId: Dispatch<SetStateAction<string | null>>;
}

const ToggleReplyCommentButton = (props: PropsInterface) => {
  const { commentId, replyingCommentId, setReplyingCommentId } = props;

  // 답글을 달 댓글 아래에 댓글 form을 toggle 합니다.
  const handleClickToggleButton = (id: string | null) => {
    setReplyingCommentId(id);
  };

  // form이 열려 있을 때
  if (replyingCommentId) {
    return (
      <button type='button' onClick={() => handleClickToggleButton(null)}>
        답글 취소
      </button>
    );
  }

  // form이 닫혀있을 때
  return (
    <button type='button' onClick={() => handleClickToggleButton(commentId)}>
      답글 쓰기
    </button>
  );
};

export default ToggleReplyCommentButton;
