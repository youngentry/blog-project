import React, { Dispatch, SetStateAction } from 'react';

import { CommentInterface } from '@/types/types';
import { patchCommentApi } from '@/services/commentsFetch';

import styles from './ConfirmEditCommentButton.module.scss';

interface PropsInterface {
  postId: string;
  editCommentInput: string;
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  initCommentEdit: () => void;
  commentId?: string;
}

const ConfirmEditCommentButton = (props: PropsInterface) => {
  const { postId, editCommentInput, commentList, setCommentList, initCommentEdit, commentId } = props;

  // 수정 확인 버튼 클릭 이벤트
  const handleClickConfirmEditButton = async (_id: string) => {
    try {
      // PATCH 요청을 보냅니다.
      const res = await patchCommentApi(postId, _id, editCommentInput);

      // 올바른 응답이 아닌 경우, 알림을 띄우고 함수를 종료합니다.
      if (!res) {
        window.alert('수정 권한이 없습니다.');
        return;
      }

      // 수정한 댓글을 반영한 결과를 state에 저장합니다.
      const copiedComments: CommentInterface[] = [...commentList];
      const editedComment: CommentInterface | undefined = copiedComments.find((comment) => String(comment._id) === _id);
      if (editedComment) {
        editedComment.comment = editCommentInput;
      }
      setCommentList(copiedComments);

      initCommentEdit(); // 댓글 수정 작업 초기화
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      className={styles.editConfirmButton}
      onClick={() => handleClickConfirmEditButton(commentId as string)}
      type='button'
    >
      수정
    </button>
  );
};

export default ConfirmEditCommentButton;
