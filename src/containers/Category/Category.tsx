import React from "react";
import Card from "./Card/Card";
import styles from "./Category.module.scss";
import Pagination from "@/components/Pagination/Pagination";

const Category = () => {
  const cardData = [
    {
      id: 1,
      link: "link",
      src: "https://cdn.pixabay.com/photo/2023/08/29/19/09/starling-8221990_640.jpg",
      title: "제목제목제목제목제목제목제목제목제목제목제목제목",
      subtitles: ["#페이지네이션", "#레이지로딩", "#예약", "#페이지네이션", "#레이지로딩", "#예약"],
      languages: ["#JavaScript", "#Rust", "#Go", "#JavaScript", "#Rust", "#Go"],
      commentCount: 10,
      likes: 7,
    },
    {
      id: 2,
      link: "link",
      src: "https://cdn.pixabay.com/photo/2023/08/26/18/01/planet-8215532_640.png",
      title: "제목",
      subtitles: ["#페이지네이션", "#예약"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      commentCount: 10,
      likes: 7,
    },
    {
      id: 3,
      link: "link",
      src: "https://cdn.pixabay.com/photo/2023/09/04/13/17/mushrooms-8232731_1280.jpg",
      title: "제목",
      subtitles: ["#레이지로딩", "#예약"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      commentCount: 10,
      likes: 7,
    },
    {
      id: 4,
      link: "link",
      src: "https://cdn.pixabay.com/photo/2023/05/14/17/46/ducklings-7993465_1280.jpg",
      title: "제목",
      subtitles: ["#예약"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      commentCount: 10,
      likes: 7,
    },
    {
      id: 5,
      link: "link",
      src: "https://cdn.pixabay.com/photo/2023/08/28/23/17/superb-fairywren-8220199_640.jpg",
      title: "제목",
      subtitles: ["#드래그앤드롭"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      commentCount: 10,
      likes: 7,
    },
  ];

  return (
    <div className={styles.category}>
      <h2>전체 게시물</h2>
      <div className={styles.cardContainer}>
        {cardData.map((data) => {
          return <Card key={data.id} data={data} />;
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default Category;
