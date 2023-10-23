import React, { Dispatch, SetStateAction } from 'react';

import { postGuestCommentDeletionApi } from '@/services/commentsFetch';
import { CommentInterface } from '@/types/types';

import styles from './ConfirmDeleteGuestCommentButton.module.scss';

export interface ConfirmDelGuestCommentButtonPropsInterface {
  postId: string;
  deleteCommentPasswordInput: string;
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
  postCommentCount: number;
  commentId?: string;
  initCheckingDeleteGuestComment: () => void;
}

const ConfirmDeleteGuestCommentButton = (props: ConfirmDelGuestCommentButtonPropsInterface) => {
  const {
    postId,
    deleteCommentPasswordInput,
    commentList,
    setCommentList,
    setPostCommentCount,
    postCommentCount,
    initCheckingDeleteGuestComment,
    commentId,
  } = props;

  // 게스트 비밀번호 입력 후 삭제확인 버튼 클릭
  const handleClickConfirmDeleteGuestComment = async (_id: string) => {
    // 댓글 삭제 확인
    if (!window.confirm('정말로 댓글을 삭제하시겠습니까?')) return;

    try {
      // POST로 비밀번호 확인삭제 요청을 보냅니다.
      const res = await postGuestCommentDeletionApi(postId, _id, deleteCommentPasswordInput);

      // 댓글 삭제 비밀번호가 다른 경우
      if (!res) {
        window.alert('비밀번호가 다릅니다.');
        return;
      }

      // 삭제된 댓글 리스트 렌더링
      const deletedCommentList = [...commentList].filter((comment: CommentInterface) => String(comment._id) !== _id);
      setCommentList(deletedCommentList);
      setPostCommentCount(postCommentCount - 1);
      initCheckingDeleteGuestComment(); // 댓글 삭제 작업 초기화
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className={styles.deleteConfirmButton}
      onClick={() => handleClickConfirmDeleteGuestComment(commentId as string)}
      type='button'
    >
      삭제
    </button>
  );
};

export default ConfirmDeleteGuestCommentButton;
