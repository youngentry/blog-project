import { getKrTime } from '@/utils/getKrTime';

import styles from './CommentItemBottom.module.scss';

const CommentItemBottom = ({ date }: { date: Date }) => {
  return (
    <div className={`${styles.bottom}`}>
      <p className={styles.date}>{getKrTime(date)}</p>
      <div>답글 쓰기</div>
    </div>
  );
};

export default CommentItemBottom;
