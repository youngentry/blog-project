import Image from "next/image";
import React from "react";
import styles from "./Spin.module.scss";

const Spin = () => {
  return (
    <div className={styles.loadingBox}>
      <Image src="/images/loadings/loading-s.gif" alt="loading" fill />
      <p>로딩중입니다.</p>
    </div>
  );
};

export default Spin;
