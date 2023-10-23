'use client';

import React, { useState } from 'react';

import { CommentInterface, CommentListPropsInterface, CustomInputPropsInterface } from '@/types/types';
import { checkBlogAdmin } from '@/utils/sessionCheck/checkBlogAdmin';
import { COMMENT_FORM_LENGTH } from '@/constants/COMMENT_LENGTH';
import useCommentList from '@/hooks/useCommentList';
import { getRelativeTime } from '@/utils/getRelativeTime';
import ConfirmEditCommentButton, {
  ConfirmEditCommentButtonPropsInterface,
} from '@/containers/Comment/components/ConfirmEditCommentButton/ConfirmEditCommentButton';
import CancelEditCommentButton, {
  CancelEditCommentButtonPropsInterface,
} from '@/containers/Comment/components/CancelEditCommentButton/CancelEditCommentButton';
import DeleteCommentButton, {
  deleteCommentButtonPropsInterface,
} from '@/containers/Comment/components/DeleteCommentButton/DeleteCommentButton';
import ToggleEditCommentButton, {
  ToggleEditCommentButtonPropsInterface,
} from '@/containers/Comment/components/ToggleEditCommentButton/ToggleEditCommentButton';
import ToggleDeleteGuestCommentModalButton, {
  ToggleDeleteModalButtonPropsInterface,
} from '@/containers/Comment/components/ToggleDeleteGuestCommentModalButton/ToggleDeleteGuestCommentModalButton';

import UserProfile from '@/components/UserProfile/UserProfile';
import styles from './CommentList.module.scss';
import DeleteGuestCommentModal from '../DeleteGuestCommentModal/DeleteGuestCommentModal';
import CustomTextarea from '@/components/inputs/CustomTextarea/CustomTextarea';

// 댓글 목록입니다.
const CommentList = ({
  postId,
  newUpdate,
  userEmail,
  postEmail,
  postCommentCount,
  setPostCommentCount,
}: CommentListPropsInterface) => {
  const { MAX_COMMENT } = COMMENT_FORM_LENGTH;

  const [editCommentInput, setEditCommentInput] = useState<string>(''); // 수정 input
  const [editingCommentId, setEditingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const [checkingGuestPassword, setCheckingGuestPassword] = useState<boolean>(false); // 게스트 댓글 비밀번호 input이 나타날지 말지 여부
  const [deletingCommentId, setDeletingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const { commentList, setCommentList } = useCommentList(postId, newUpdate);

  // 코멘트 수정 초기화
  const initCommentEdit = () => {
    setEditingCommentId(''); // 수정할 댓글 id 초기화
    setEditCommentInput(''); // 수정할 댓글 초기화
  };

  // 댓글 수정 input
  const editCommentInputProps: CustomInputPropsInterface = {
    value: editCommentInput,
    maxLength: MAX_COMMENT,
    dispatch: setEditCommentInput,
  };

  // 댓글 수정 form이 나타나도록 하는 button
  const startEditCommentButtonProps: ToggleEditCommentButtonPropsInterface = {
    setEditingCommentId,
    setEditCommentInput,
  };

  // 게스트 댓글 삭제 모달
  const deleteGuestCommentModalProps = {
    setCheckingGuestPassword,
    postId,
    commentList,
    setCommentList,
    setPostCommentCount,
    postCommentCount,
  };

  // 권한 있는 댓글 삭제 button
  const deleteCommentButtonProps: deleteCommentButtonPropsInterface = {
    postId,
    commentList,
    setCommentList,
    setPostCommentCount,
    postCommentCount,
  };

  // 게스트 댓글 삭제 form이 나타나도록 하는 button
  const toggleDeleteModalButtonProps: ToggleDeleteModalButtonPropsInterface = {
    setCheckingGuestPassword,
    setDeletingCommentId,
    setEditCommentInput,
  };

  // 댓글 수정 확인 button
  const confirmEditCommentButtonProps: ConfirmEditCommentButtonPropsInterface = {
    postId,
    editCommentInput,
    commentList,
    setCommentList,
    initCommentEdit,
  };

  // 댓글 수정 취소 button
  const cancelEditCommentButtonProps: CancelEditCommentButtonPropsInterface = {
    initCommentEdit,
  };

  return (
    <ul className={styles.commentList}>
      {commentList &&
        commentList.map((commentItem: CommentInterface) => {
          const { comment, date, isLoggedIn, nickname, author, _id } = commentItem;
          const commentId = String(_id); // key에 할당하기 위해 직렬화합니다.

          // 댓글 수정 및 삭제 권한이 있는지 여부에 따라 삭제 버튼이 나타나도록 합니다.
          const isSameCommenter: boolean = isLoggedIn && userEmail === author; // 동일한 댓글 작성자
          const isBlogAdmin: boolean = checkBlogAdmin(userEmail); // 블로그 관리자
          const canEdit: boolean = isSameCommenter || !isLoggedIn || isBlogAdmin; // 수정 권한 여부
          const isVisibleDeleteGuestCommentModal =
            deletingCommentId === commentId && checkingGuestPassword && !isLoggedIn; // 게스트 댓글 삭제버튼 visible 여부
          console.log(postEmail, author);
          console.log(postEmail === author);
          return (
            <li key={commentId} className={`${styles.commentItem}`}>
              <div className={styles.thumbnail}>
                <UserProfile isLoggedIn={isLoggedIn} />
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.user}>
                    <p className={styles.nickname}>{nickname}</p>
                    <p className={styles.date}>{getRelativeTime(String(date))}</p>
                    <p className={`${styles.postAuthor} ${postEmail === author && 'visible'}`}>작성자</p>
                  </div>
                  {canEdit && (
                    <div className={styles.buttons}>
                      <ToggleEditCommentButton
                        {...startEditCommentButtonProps}
                        isLoggedIn={isLoggedIn}
                        commentId={commentId}
                        comment={comment}
                      />

                      {isSameCommenter || isBlogAdmin ? (
                        <DeleteCommentButton {...deleteCommentButtonProps} commentId={commentId} />
                      ) : (
                        <ToggleDeleteGuestCommentModalButton {...toggleDeleteModalButtonProps} commentId={commentId} />
                      )}
                      <DeleteGuestCommentModal
                        {...deleteGuestCommentModalProps}
                        isVisibleDeleteGuestCommentModal={isVisibleDeleteGuestCommentModal}
                        commentId={commentId}
                      />
                    </div>
                  )}
                </div>
                <div className={`${styles.body} ${editingCommentId === commentId && 'hide'}`}>
                  <p className={`${styles.comment} `}>{comment}</p>
                </div>
                <div className={`${styles.editForm} ${editingCommentId === commentId && 'visible'}`}>
                  <CustomTextarea
                    className={`${styles.textarea}`}
                    placeholder='댓글을 입력하세요.'
                    {...editCommentInputProps}
                  />
                  <ConfirmEditCommentButton {...confirmEditCommentButtonProps} commentId={commentId} />
                  <CancelEditCommentButton {...cancelEditCommentButtonProps} />
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CommentList;
