import React from 'react';

import styles from './Footer.module.scss';
import { Logo } from '@/components/logos/logos';
import { BsArrowDown } from 'react-icons/bs';

// footer 레이아웃 컴포넌트입니다.
const Footer = () => {
  return (
    <footer className={styles.container}>
      <h3>Project Info</h3>
      <div className={styles.links}>
        <Logo domainName='github' />
        <Logo domainName='tistory' />
      </div>
      <div className={styles.madeBy}>
        <span>Made by</span>
        <a href='mailto:gentry_@naver.com'>gentry_@naver.com</a>
      </div>
    </footer>
  );
};

export default Footer;
