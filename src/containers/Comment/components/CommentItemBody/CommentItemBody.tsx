import { Dispatch, SetStateAction } from 'react';

import { COMMENT_FORM_LENGTH } from '@/constants/LENGTH';
import { CommentInterface } from '@/types/types';

import styles from './CommentItemBody.module.scss';
import CustomTextarea from '@/components/inputs/CustomTextarea/CustomTextarea';
import ConfirmEditCommentButton from '../buttons/ConfirmEditCommentButton/ConfirmEditCommentButton';
import CancelEditCommentButton from '../buttons/CancelEditCommentButton/CancelEditCommentButton';

interface PropsInterface {
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  postId: string;
  commentId: string;
  comment: string;
  editingCommentId: string;
  editCommentInput: string;
  setEditingCommentId: Dispatch<SetStateAction<string>>;
  setEditCommentInput: Dispatch<SetStateAction<string>>;
}

const CommentItemBody = (props: PropsInterface) => {
  const {
    commentList,
    setCommentList,
    postId,
    commentId,
    comment, // 댓글 본문
    editingCommentId,
    setEditingCommentId,
    editCommentInput,
    setEditCommentInput,
  } = props;

  const { MAX_COMMENT } = COMMENT_FORM_LENGTH;

  // 코멘트 수정 초기화
  const initCommentEdit = () => {
    setEditingCommentId(''); // 수정할 댓글 id 초기화
    setEditCommentInput(''); // 수정할 댓글 초기화
  };

  // 댓글 수정 input
  const editCommentInputProps = {
    value: editCommentInput,
    maxLength: MAX_COMMENT,
    dispatch: setEditCommentInput,
  };

  // 댓글 수정 확인 button
  const confirmEditCommentButtonProps = {
    postId,
    editCommentInput,
    commentList,
    setCommentList,
    initCommentEdit,
  };

  // 댓글 수정 취소 button
  const cancelEditCommentButtonProps = {
    initCommentEdit,
  };
  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.content} ${editingCommentId === commentId && 'hide'}`}>
        <p className={`${styles.text} `}>{comment}</p>
      </div>
      <div className={`${styles.editForm} ${editingCommentId === commentId && 'visible'}`}>
        <CustomTextarea className={`${styles.textarea}`} placeholder='댓글을 입력하세요.' {...editCommentInputProps} />
        <ConfirmEditCommentButton {...confirmEditCommentButtonProps} commentId={commentId} />
        <CancelEditCommentButton {...cancelEditCommentButtonProps} />
      </div>
    </div>
  );
};

export default CommentItemBody;
