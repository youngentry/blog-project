import React from "react";
import styles from "./MainPage.module.scss";
import Slider from "./components/Slider/Slider";
import Slogan from "./components/Slogan/Slogan";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Slogan />
      <Slider />
    </div>
  );
};

export default MainPage;
