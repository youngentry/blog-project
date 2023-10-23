import React from 'react';
import { BsChatDots } from 'react-icons/bs';

import styles from './GoPostCommentButton.module.scss';

const GoPostCommentButton = ({ children }: { children: any }) => {
  // 게시물의 댓글 영역으로 바로 이동하는 기능을 추가할까 했지만, 불필요한 듯 하여 당장은 구현하지 않습니다.
  return (
    <button className={styles.goPostCommentButton} type='button'>
      <BsChatDots />
      {children}
    </button>
  );
};

export default GoPostCommentButton;
