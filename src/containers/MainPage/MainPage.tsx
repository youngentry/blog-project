import React from "react";
import styles from "./MainPage.module.scss";
import Slider from "./components/Slider/Slider";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2 className={styles.mainTitle}>
          {`Youngentry's`} <br /> Next13 + TypeScript
          <br /> 블로그 프로젝트
        </h2>
        <p>
          블로그 기능 어디까지 만들 수 있을까?
          <br />
          궁금하면 만들어 봐! (ง •_•)ง
        </p>
        <div className={styles.links}>Github Tistory</div>
      </div>
      <div className={styles.sliderContainer}>
        <Slider />
      </div>
    </div>
  );
};

export default MainPage;
