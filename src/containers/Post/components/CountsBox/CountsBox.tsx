import GoPostCommentButton from '@/components/buttons/GoPostCommentButton/GoPostCommentButton';
import styles from './CountsBox.module.scss';
import LikePostButton from '@/components/buttons/LikePostButton/LikePostButton';

interface CountsBoxPropsInterface {
  postCommentCount: number;
  likes: string[];
  postId: string;
  userEmail: string;
}

const CountsBox = ({ postCommentCount, likes, postId, userEmail }: CountsBoxPropsInterface) => {
  return (
    <div className={styles.countsBox}>
      <GoPostCommentButton>{postCommentCount}</GoPostCommentButton>
      <LikePostButton likes={likes} postId={postId} userEmail={userEmail} />
    </div>
  );
};

export default CountsBox;
