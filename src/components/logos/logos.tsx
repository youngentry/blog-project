import React from "react";
import styles from "./logos.module.scss";
import Image from "next/image";
import { BsArrowUpRightSquare } from "react-icons/bs";
import Link from "next/link";

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
  const lowerCase = domainName.toLocaleLowerCase();
  const UpperCase = domainName.toUpperCase();

  const getLink = (lowerCase: string) => {
    if (lowerCase === "github") {
      return "https://github.com/youngentry/blog-project";
    }
    if (lowerCase === "tistory") {
      return "https://sakuraop.tistory.com/category/blog";
    }
  };

  const link = getLink(lowerCase); // 로고 클릭하면 연결되는 주소

  return (
    <Link href={link as string} target="_blank" rel="noopener noreferrer">
      <div className={styles.logo}>
        <Image
          src={`/images/logos/${lowerCase}.png`}
          alt={`${lowerCase} logo`}
          width={width || 25}
          height={height || 25}
        />
        <p>
          <span>{UpperCase}</span>
          <i>
            <BsArrowUpRightSquare />
          </i>
        </p>
      </div>
    </Link>
  );
};
