import Image from "next/image";
import React from "react";
import styles from "./Spin.module.scss";

/**
 * 로딩 빙글빙글 컴포넌트입니다. size 는 string으로 고르면 됩니다.
 * @param {string} size 작은사이즈: "s" 중간사이즈: "m"
 * @param {boolean} message "로딩중입니다." 메시지 출력 원하면 true
 */
const Spin = ({ size, message = "" }: { size: string; message?: string }) => {
  const squareSize = size === "s" ? 50 : 100;
  return (
    <div className={styles.loadingBox}>
      <Image
        src={`/images/loadings/loading-s.gif`}
        alt="loading"
        width={squareSize}
        height={squareSize}
      />
      <p>{message || "로딩중입니다."}</p>
    </div>
  );
};

export default Spin;
