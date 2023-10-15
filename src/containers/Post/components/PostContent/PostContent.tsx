import Image from 'next/image';

import styles from './PostContent.module.scss';

// eslint-disable-next-line
import { sanitize } from 'dompurify';

interface PostContentInterface {
  contents: string;
  src: string;
}

const PostContent = ({ contents, src }: PostContentInterface) => {
  // 게시물 본문
  const innerHTML = { dangerouslySetInnerHTML: { __html: sanitize(contents) } };

  return (
    <div className={styles.content}>
      <div className={styles.thumbnail}>
        <Image src={src} alt='post content image' fill />
      </div>
      <div {...innerHTML} />
    </div>
  );
};

export default PostContent;
