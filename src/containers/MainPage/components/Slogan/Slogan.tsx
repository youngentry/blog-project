import React from 'react';

import styles from './Slogan.module.scss';
import { Logo } from '@/components/logos/logos';

const Slogan = () => {
  return (
    <div className={styles.slogan}>
      <h2 className={styles.mainTitle}>
        {`Youngentry's`} <br /> Next13 + TypeScript
        <br /> 블로그 프로젝트
      </h2>
      <p className={styles.description}>
        블로그 기능 어디까지 만들 수 있을까?
        <br />
        궁금하면 만들어 봐! (ง •_•)ง
      </p>
      <div className={styles.links}>
        <Logo domainName='github' />
        <Logo domainName='tistory' />
      </div>
    </div>
  );
};

export default Slogan;
