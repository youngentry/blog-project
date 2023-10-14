import React from 'react';

import styles from './ManageDescription.module.scss';

const ManageDescription = ({ description }: { description: string }) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ManageDescription;
