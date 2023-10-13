import React from 'react';
import styles from './Notice.module.scss';

interface NoticeProps {
  boxPosition: string; // "left" => left:0, "right = right:0"
  children: string;
}

const Notice = ({ children = '', boxPosition = 'left' }: NoticeProps) => {
  return (
    <div className={styles.container} style={{ [boxPosition]: 0 }}>
      {children}
    </div>
  );
};

export default Notice;
