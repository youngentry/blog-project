import { useUserSessionValue } from '@/jotai/userAtom';

import GoPostCommentButton from '@/components/buttons/GoPostCommentButton/GoPostCommentButton';
import styles from './CountsBox.module.scss';
import LikePostButton from '@/components/buttons/LikePostButton/LikePostButton';

interface CountsBoxPropsInterface {
  postCommentCount: number;
  likes: string[];
  postId: string;
}

const CountsBox = ({ postCommentCount, likes, postId }: CountsBoxPropsInterface) => {
  const userSession = useUserSessionValue();
  const userEmail = userSession?.email || '';

  return (
    <div className={styles.countsBox}>
      <GoPostCommentButton>{postCommentCount}</GoPostCommentButton>
      <LikePostButton likes={likes} postId={postId} userEmail={userEmail} />
    </div>
  );
};

export default CountsBox;
