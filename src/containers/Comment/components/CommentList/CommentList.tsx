'use client';

import React, { useState } from 'react';

import { CommentInterface, CommentListPropsInterface } from '@/types/types';
import { checkBlogAdmin } from '@/utils/sessionCheck/checkBlogAdmin';
import { COMMENT_FORM_LENGTH } from '@/constants/COMMENT_LENGTH';
import { deleteCommentApi, patchCommentApi, postGuestCommentDeletionApi } from '@/services/commentsFetch';
import useCommentList from '@/hooks/useCommentList';
import { getRelativeTime } from '@/utils/getRelativeTime';

import UserProfile from '@/components/UserProfile/UserProfile';
import { CustomInput, CustomTextarea } from '@/components/inputs/CustomInputs/CustomInputs';
import styles from './CommentList.module.scss';

const CommentList = ({
  postId,
  newUpdate,
  userEmail,
  postCommentCount,
  setPostCommentCount,
}: CommentListPropsInterface) => {
  const { MAX_PASSWORD, MAX_COMMENT } = COMMENT_FORM_LENGTH;

  const [editComment, setEditComment] = useState<string>(''); // 수정 input
  const [editingCommentId, setEditingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const [checkingGuestPassword, setCheckingGuestPassword] = useState<boolean>(false); // 게스트 댓글 비밀번호 input이 나타날지 말지 여부
  const [deletePassword, setDeletePassword] = useState<string>(''); // 게스트 댓글 비밀번호 input
  const [deletingCommentId, setDeletingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  const { commentList, setCommentList } = useCommentList(postId, newUpdate);

  // 수정 확인 버튼 클릭 이벤트
  const handleClickConfirmEditButton = async (_id: string) => {
    try {
      // PATCH 요청을 보냅니다.
      const res = await patchCommentApi(postId, _id, editComment);

      // 올바른 응답이 아닌 경우, 알림을 띄우고 함수를 종료합니다.
      if (!res) {
        window.alert('수정 권한이 없습니다.');
        return;
      }

      // 수정한 댓글을 반영한 결과를 state에 저장합니다.
      const copiedComments: CommentInterface[] = [...commentList];
      const editedComment: CommentInterface | undefined = copiedComments.find((comment) => String(comment._id) === _id);
      if (editedComment) {
        editedComment.comment = editComment;
      }
      setCommentList(copiedComments);

      cancelEdit(); // 댓글 수정 작업 초기화
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제 버튼 클릭 이벤트
  const handleClickDeleteButton = async (_id: string) => {
    // 댓글 삭제 확인
    if (!window.confirm('정말로 댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      // DELETE 요청을 보냅니다.
      const res = await deleteCommentApi(postId, _id);

      // 삭제 권한이 없는 경우
      if (!res) {
        window.alert('삭제 권한이 없습니다.');
        return;
      }

      // 삭제한 댓글을 제외한 결과를 state에 저장합니다.
      const afterDeleteComments: CommentInterface[] = commentList.filter(
        (comment: CommentInterface) => String(comment._id) !== _id,
      );
      setCommentList(afterDeleteComments);
      setPostCommentCount(postCommentCount - 1);
    } catch (err) {
      console.error(err);
    }
  };

  // 게스트 비밀번호 입력 후 삭제확인 버튼 클릭
  const handleClickConfirmGuestPassword = async (_id: string) => {
    // 댓글 삭제 확인
    if (!window.confirm('정말로 댓글을 삭제하시겠습니까?')) return;

    try {
      // POST로 비밀번호 확인삭제 요청을 보냅니다.
      const res = await postGuestCommentDeletionApi(postId, _id, deletePassword);

      // 댓글 삭제 비밀번호가 다른 경우
      if (!res) {
        window.alert('비밀번호가 다릅니다.');
        return;
      }

      // 삭제된 댓글 리스트 렌더링
      const deletedCommentList = [...commentList].filter((comment: CommentInterface) => String(comment._id) !== _id);
      setCommentList(deletedCommentList);
      setPostCommentCount(postCommentCount - 1);
      cancelCheckingPassword(); // 댓글 삭제 작업 초기화
    } catch (err) {
      console.error(err);
    }
  };

  // "수정 버튼 클릭" 이벤트
  const handleClickEditButton = async (_id: string, originComment: string) => {
    setEditingCommentId(_id); // 수정할 댓글 id
    setEditComment(originComment); // 수정할 댓글 불러오기
  };

  // "수정 취소 버튼 클릭" 이벤트
  const cancelEdit = () => {
    setEditingCommentId(''); // 수정할 댓글 id 초기화
    setEditComment(''); // 수정할 댓글 초기화
  };

  // "게스트 댓글 삭제 버튼 클릭" 이벤트
  const handleClickGuestDeleteButton = (_id: string) => {
    setDeletingCommentId(_id); // 삭제확인 input 출력할 댓글 id
    setCheckingGuestPassword(true); // 삭제확인 input 출력
    setEditComment(''); // 수정 중인 댓글 초기화
  };

  // "게스트 댓글 삭제 비밀번호 입력 취소" 이벤트
  const cancelCheckingPassword = () => {
    setCheckingGuestPassword(false); // 삭제확인 input 제거
    setDeletePassword(''); // 삭제확인 비밀번호 초기화
  };

  const deletePasswordInputProps = {
    value: deletePassword,
    maxLength: MAX_PASSWORD,
    dispatch: setDeletePassword,
  };

  const editCommentInputProps = {
    value: editComment,
    maxLength: MAX_COMMENT,
    dispatch: setEditComment,
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
          const canEdit: boolean = isSameCommenter || !isLoggedIn || isBlogAdmin; // 수정 권한
          const isVisibleConfirmDeletePassword =
            deletingCommentId === commentId && checkingGuestPassword && !isLoggedIn; // 게스트 댓글 삭제버튼 visible 여부
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
                  </div>
                  {canEdit && (
                    <div className={styles.buttons}>
                      <button
                        className={`${styles.editButton} ${!isLoggedIn && 'hide'}`}
                        onClick={() => handleClickEditButton(commentId, comment)}
                        type='button'
                      >
                        수정
                      </button>
                      <div
                        className={`${styles.deleteConfirmModal} ${
                          isVisibleConfirmDeletePassword && `${styles.visible}`
                        }`}
                      >
                        <CustomInput
                          className={`${styles.deleteConfirmInput}`}
                          placeholder='비밀번호'
                          inputType='password'
                          {...deletePasswordInputProps}
                        />
                        <button
                          className={styles.deleteConfirmButton}
                          onClick={() => handleClickConfirmGuestPassword(commentId)}
                          type='button'
                        >
                          삭제
                        </button>
                        <button
                          className={styles.deleteCancelButton}
                          onClick={() => cancelCheckingPassword()}
                          type='button'
                        >
                          취소
                        </button>
                      </div>
                      <button
                        className={styles.deleteButton}
                        onClick={
                          isSameCommenter || isBlogAdmin
                            ? () => handleClickDeleteButton(commentId)
                            : () => handleClickGuestDeleteButton(commentId)
                        }
                        type='button'
                      >
                        삭제
                      </button>
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
                  <button
                    className={styles.editConfirmButton}
                    onClick={() => handleClickConfirmEditButton(commentId)}
                    type='button'
                  >
                    수정
                  </button>
                  <button className={styles.editCancelButton} onClick={() => cancelEdit()} type='button'>
                    취소
                  </button>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CommentList;
