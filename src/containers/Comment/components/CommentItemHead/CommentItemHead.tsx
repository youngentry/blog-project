import { useState } from 'react';

import { checkBlogAdmin } from '@/utils/sessionCheck/checkBlogAdmin';

import styles from './CommentItemHead.module.scss';
import ToggleEditCommentButton from '../buttons/ToggleEditCommentButton/ToggleEditCommentButton';
import DeleteCommentButton from '../buttons/DeleteCommentButton/DeleteCommentButton';
import ToggleDeleteGuestCommentModalButton from '../buttons/ToggleDeleteGuestCommentModalButton/ToggleDeleteGuestCommentModalButton';
import DeleteGuestCommentModal from '../DeleteGuestCommentModal/DeleteGuestCommentModal';

const CommentItemHead = (props: any) => {
  const {
    userEmail,
    postEmail,
    commentId,
    postId,
    nickname,
    isLoggedIn,
    author,
    postCommentCount,
    setPostCommentCount,
    setEditCommentInput,
    setEditingCommentId,
    commentList,
    setCommentList,
    comment,
  } = props;

  const [checkingGuestPassword, setCheckingGuestPassword] = useState<boolean>(false); // 게스트 댓글 비밀번호 input이 나타날지 말지 여부
  const [deletingCommentId, setDeletingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  // 댓글 수정 및 삭제 권한이 있는지 여부에 따라 삭제 버튼이 나타나도록 합니다.
  const isSameCommenter: boolean = isLoggedIn && userEmail === author; // 동일한 댓글 작성자
  const isBlogAdmin: boolean = checkBlogAdmin(userEmail); // 블로그 관리자

  const canEdit: boolean = isSameCommenter || !isLoggedIn || isBlogAdmin; // 수정 권한 여부
  const isVisibleDeleteGuestCommentModal = deletingCommentId === commentId && checkingGuestPassword && !isLoggedIn; // 게스트 댓글 삭제버튼 visible 여부

  // 댓글 수정 form이 나타나도록 하는 button
  const startEditCommentButtonProps = {
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
  const deleteCommentButtonProps = {
    postId,
    commentList,
    setCommentList,
    setPostCommentCount,
    postCommentCount,
  };

  // 게스트 댓글 삭제 form이 나타나도록 하는 button
  const toggleDeleteModalButtonProps = {
    setCheckingGuestPassword,
    setDeletingCommentId,
    setEditCommentInput,
  };

  return (
    <div className={styles.head}>
      <div className={styles.user}>
        <p className={styles.nickname}>{nickname}</p>
        <p className={`${styles.postAuthor} ${postEmail === author && 'visible'}`}>작성자</p>
      </div>
      <div className={styles.buttons}>
        {canEdit && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItemHead;
