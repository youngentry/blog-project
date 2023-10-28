import { Dispatch, SetStateAction } from 'react';

import { deleteCommentApi } from '@/services/commentsFetch';
import { CommentInterface } from '@/types/types';

import styles from './DeleteCommentButton.module.scss';

interface PropsInterface {
  postId: string;
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  postCommentCount?: number;
  setPostCommentCount?: Dispatch<SetStateAction<number>>;
  commentId?: string;
}

const DeleteCommentButton = (props: PropsInterface) => {
  const { postId, commentList, setCommentList, setPostCommentCount, postCommentCount, commentId } = props;

  // 삭제 버튼 클릭 이벤트
  const handleClickDeleteCommentButton = async (_id: string) => {
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
      if (setPostCommentCount && postCommentCount) {
        setPostCommentCount(postCommentCount - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className={styles.deleteButton}
      onClick={() => handleClickDeleteCommentButton(commentId as string)}
      type='button'
    >
      삭제
    </button>
  );
};

export default DeleteCommentButton;
