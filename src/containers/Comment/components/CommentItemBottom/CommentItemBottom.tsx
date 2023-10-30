import { useState } from 'react';

import { getKrTime } from '@/utils/getKrTime';
import { CommentFormPropsInterface } from '@/types/types';

import styles from './CommentItemBottom.module.scss';
import CommentForm from '../CommentForm/CommentForm';
import ToggleReplyCommentButton from '../buttons/ToggleReplyCommentButton/ToggleReplyCommentButton';

// 댓글의 답글용 form props
interface PropsInterface extends CommentFormPropsInterface {
  date: Date;
  commentId: string;
}

const CommentItemBottom = (props: PropsInterface) => {
  const {
    postId,
    userEmail,
    postEmail,
    postCommentCount,
    setPostCommentCount,
    newUpdate,
    setNewUpdate,
    date,
    commentId,
    depth,
    replyToNickname,
    replyToEmail,
    parentCommentId,
  } = props;

  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);

  // 댓글의 답글용 form props
  const commentFormProps = {
    postId,
    userEmail,
    postEmail,
    postCommentCount,
    setPostCommentCount,
    newUpdate,
    setNewUpdate,
    replyingCommentId,
    depth,
    replyToNickname,
    replyToEmail,
    parentCommentId,
    setReplyingCommentId,
  };

  const toggleReplyCommentButtonProps = {
    replyingCommentId,
    setReplyingCommentId,
    commentId,
  };

  return (
    <div className={`${styles.bottom}`}>
      <div className={`${styles.dateAndReplyBox}`}>
        <p className={styles.date}>{getKrTime(date)}</p>
        <ToggleReplyCommentButton {...toggleReplyCommentButtonProps} />
      </div>

      {replyingCommentId && <CommentForm {...commentFormProps} />}
    </div>
  );
};

export default CommentItemBottom;
