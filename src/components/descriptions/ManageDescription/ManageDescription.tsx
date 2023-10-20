import React, { memo } from 'react';

import styles from './ManageDescription.module.scss';

const ManageDescription = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default memo(ManageDescription);
