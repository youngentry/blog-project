import React from 'react';
import Image from 'next/image';

import styles from './NoItem.module.scss';

const NoItem = ({ h2, src }: { h2: string; src: string }) => {
  return (
    <div className={styles.container}>
      <h3>{h2}</h3>
      <Image src={src} alt='no data sample' fill />
    </div>
  );
};

export default NoItem;
