import { Dispatch, SetStateAction, useState } from 'react';

import { CommentInterface } from '@/types/types';
import { checkIsBlogAdmin } from '@/utils/sessionCheck/checkUserRole';
import { useUserSessionValue } from '@/jotai/userAtom';

import styles from './CommentItemHead.module.scss';
import ToggleEditCommentButton from '../buttons/ToggleEditCommentButton/ToggleEditCommentButton';
import DeleteCommentButton from '../buttons/DeleteCommentButton/DeleteCommentButton';
import ToggleDeleteGuestCommentModalButton from '../buttons/ToggleDeleteGuestCommentModalButton/ToggleDeleteGuestCommentModalButton';
import DeleteGuestCommentModal from '../DeleteGuestCommentModal/DeleteGuestCommentModal';

interface PropsInterface {
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  postEmail?: string;
  postId: string;
  commentId: string;
  nickname: string;
  isLoginComment: boolean;
  author: string;
  comment: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
  setEditingCommentId: Dispatch<SetStateAction<string>>;
  setEditCommentInput: Dispatch<SetStateAction<string>>;
}

const CommentItemHead = (props: PropsInterface) => {
  const {
    commentList,
    setCommentList,
    postEmail, // 게시물 작성자
    postId,
    commentId,
    nickname,
    isLoginComment, // 유저/게스트 댓글 구분하는 속성
    author,
    comment,
    postCommentCount,
    setPostCommentCount,
    setEditingCommentId,
    setEditCommentInput,
  } = props;
  const userSession = useUserSessionValue();
  const userEmail = userSession?.email || '';
  const userRole = userSession?.role || '';

  const [checkingGuestPassword, setCheckingGuestPassword] = useState<boolean>(false); // 게스트 댓글 비밀번호 input이 나타날지 말지 여부
  const [deletingCommentId, setDeletingCommentId] = useState<string>(''); // 수정중인 댓글 ObjectId

  // 댓글 수정 및 삭제 권한이 있는지 여부에 따라 삭제 버튼이 나타나도록 합니다.
  const isSameCommenter: boolean = isLoginComment && userEmail === author; // 동일한 댓글 작성자
  const isBlogAdmin: boolean = checkIsBlogAdmin(userRole); // 블로그 관리자

  const canEdit: boolean = isSameCommenter || !isLoginComment || isBlogAdmin; // 수정 권한 여부
  const isVisibleDeleteGuestCommentModal = deletingCommentId === commentId && checkingGuestPassword && !isLoginComment; // 게스트 댓글 삭제버튼 visible 여부

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
              isLoginComment={isLoginComment}
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
