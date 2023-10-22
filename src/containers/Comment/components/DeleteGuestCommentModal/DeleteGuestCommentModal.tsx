import React, { useState, useCallback, memo } from 'react';

import { COMMENT_FORM_LENGTH } from '@/constants/COMMENT_LENGTH';
import { CustomInputPropsInterface } from '@/types/types';

import styles from './DeleteGuestCommentModal.module.scss';
import ConfirmDeleteGuestCommentButton, {
  ConfirmDelGuestCommentButtonPropsInterface,
} from '@/components/buttons/ConfirmDeleteGuestCommentButton/ConfirmDeleteGuestCommentButton';
import CancelDeleteGuestCommentButton, {
  CancelDeleteGuestCommentButtonPropsInterface,
} from '@/components/buttons/CancelDeleteGuestCommentButton/CancelDeleteGuestCommentButton';
import CustomInput from '@/components/inputs/CustomInput/CustomInput';

const DeleteGuestCommentModal = (props: any) => {
  const {
    setCheckingGuestPassword,
    postId,
    commentList,
    setCommentList,
    setPostCommentCount,
    postCommentCount,
    isVisibleDeleteGuestCommentModal,
    commentId,
  } = props;

  const { MAX_PASSWORD } = COMMENT_FORM_LENGTH;

  const [deleteCommentPasswordInput, setDeleteCommentPasswordInput] = useState<string>(''); // 게스트 댓글 비밀번호 input

  // 게스트 댓글 삭제 비밀번호 초기화
  const initCheckingDeleteGuestComment = useCallback(() => {
    setCheckingGuestPassword(false); // 삭제 확인 모달 invisible
    setDeleteCommentPasswordInput(''); // 삭제확인 비밀번호 초기화
  }, [setCheckingGuestPassword]);

  // 게스트 댓글 삭제 비밀번호 input
  const deletePasswordInputInputProps: CustomInputPropsInterface = {
    value: deleteCommentPasswordInput,
    maxLength: MAX_PASSWORD,
    dispatch: setDeleteCommentPasswordInput,
  };

  // 게스트 댓글 삭제 확인 button
  const confirmDeleteGuestCommentButtonProps: ConfirmDelGuestCommentButtonPropsInterface = {
    postId,
    commentList,
    setCommentList,
    setPostCommentCount,
    postCommentCount,
    deleteCommentPasswordInput,
    initCheckingDeleteGuestComment,
  };

  // 게스트 댓글 삭제 취소 button
  const cancelDeleteGuestCommentProps: CancelDeleteGuestCommentButtonPropsInterface = {
    initCheckingDeleteGuestComment,
  };

  return (
    <div className={`${styles.deleteConfirmModal} ${isVisibleDeleteGuestCommentModal && styles.visible}`}>
      <CustomInput
        className={`${styles.deletePasswordInput}`}
        placeholder='비밀번호'
        inputType='password'
        {...deletePasswordInputInputProps}
      />
      <ConfirmDeleteGuestCommentButton {...confirmDeleteGuestCommentButtonProps} commentId={commentId} />
      <CancelDeleteGuestCommentButton {...cancelDeleteGuestCommentProps} />
    </div>
  );
};

export default memo(DeleteGuestCommentModal);
