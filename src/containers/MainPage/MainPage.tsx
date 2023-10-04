import React from "react";
import styles from "./MainPage.module.scss";
import QuizSlider from "./QuizSlider/QuizSlider";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <QuizSlider />
    </div>
  );
};

export default MainPage;
