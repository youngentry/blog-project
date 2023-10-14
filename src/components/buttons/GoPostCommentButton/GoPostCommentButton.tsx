import React from 'react';
import { BsChatDots } from 'react-icons/bs';

import styles from './GoPostCommentButton.module.scss';

const GoPostCommentButton = ({ children }: { children: any; postId: string }) => {
  return (
    <button className={styles.goPostCommentButton} type='button'>
      <BsChatDots />
      {children}
    </button>
  );
};

export default GoPostCommentButton;
