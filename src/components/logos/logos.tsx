import React from 'react';
import Image from 'next/image';
import { BsArrowUpRightSquare } from 'react-icons/bs';
import Link from 'next/link';

import styles from './logos.module.scss';

interface LogoProps {
  domainName: string; // ex) github, tistory
  width?: number; // default: 25
  height?: number; // default: 25
}

/**
 * 로고 추가해서 사용하려면 public/images/logos/ 경로에 추가해주시면 됩니다.
 */
export const Logo = (props: LogoProps) => {
  const { domainName, width, height } = props;
  const lowerCasedHost = domainName.toLocaleLowerCase();
  const UpperCasedHost = domainName.toUpperCase();

  const getLink = (domain: string) => {
    if (domain === 'github') {
      return 'https://github.com/youngentry/blog-project';
    }
    if (domain === 'tistory') {
      return 'https://sakuraop.tistory.com/category/blog';
    }

    return '';
  };

  const link = getLink(lowerCasedHost); // 로고 클릭하면 연결되는 주소

  return (
    <Link href={link as string} target='_blank' rel='noopener noreferrer'>
      <div className={styles.logo}>
        <Image
          src={`/images/logos/${lowerCasedHost}.png`}
          alt={`${lowerCasedHost} logo`}
          width={width || 25}
          height={height || 25}
        />
        <p>
          <span>{UpperCasedHost}</span>
          <i>
            <BsArrowUpRightSquare />
          </i>
        </p>
      </div>
    </Link>
  );
};
