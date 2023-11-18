import Link from 'next/link';

import { getDateForm } from '@/utils/getDateForm';
import EditPostButton from '@/containers/Post/components/EditPostButton/EditPostButton';
import DeletePostButton from '@/containers/Post/components/DeletePostButton/DeletePostButton';
import { checkIsSameAuthor } from '@/utils/sessionCheck/checkIsSameAuthor';

import styles from './PostHead.module.scss';

interface PostHeadPropsInterface {
  userEmail: string;
  userRole: string | null | undefined;
  postEmail: string;
  subtitle: string;
  postTitle: string;
  author: string;
  date: string | Date;
  postId: string;
}

const PostHead = ({
  userEmail,
  userRole,
  postEmail,
  subtitle,
  postTitle,
  author,
  date,
  postId,
}: PostHeadPropsInterface) => {
  const NON_POST_TITLE = '제목없음';

  // 같은 작성자인 경우에는 '수정', '삭제' 버튼이 나타나도록 합니다.
  const isSameAuthor: boolean = checkIsSameAuthor(userRole, userEmail, postEmail); // 로그인 유저와 게시물 작성자 비교

  return (
    <div className={styles.head}>
      <div className={styles.subtitle}>
        <Link href={{ pathname: '/category', query: { subtitle } }}>
          <span>#{subtitle}</span>
        </Link>
      </div>
      <h2>{postTitle || NON_POST_TITLE}</h2>
      <div className={styles.info}>
        <span className={styles.author}>{author}</span>
        <span className={styles.date}>{getDateForm(String(date), true)}</span>
        {isSameAuthor && (
          <div className={styles.buttons}>
            <EditPostButton postId={postId} />
            <DeletePostButton postId={postId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHead;
