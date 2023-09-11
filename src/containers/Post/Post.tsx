import Image from "next/image";
import React from "react";
import styles from "./Post.module.scss";
import { post } from "@/types/post";

const Post = ({ postId }: any) => {
  const cardData: post[] = [
    {
      id: 1,
      link: "/post/1",
      src: "https://cdn.pixabay.com/photo/2023/08/29/19/09/starling-8221990_640.jpg",
      title: "제목제목제목제목제목제목제목제목제목제목제목제목",
      subtitles: ["#페이지네이션", "#레이지로딩", "#예약", "#페이지네이션", "#레이지로딩", "#예약"],
      languages: ["#JavaScript", "#Rust", "#Go", "#JavaScript", "#Rust", "#Go"],
      content: "ㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ",
      commentCount: 10,
      author: "young",
      date: new Date(),
      likes: 7,
    },
    {
      id: 2,
      link: "/post/2",
      src: "https://cdn.pixabay.com/photo/2023/08/26/18/01/planet-8215532_640.png",
      title: "제목",
      subtitles: ["#페이지네이션", "#예약"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      content: "ㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ",
      commentCount: 10,
      author: "young",
      date: new Date(),
      likes: 7,
    },
    {
      id: 3,
      link: "/post/3",
      src: "https://cdn.pixabay.com/photo/2023/09/04/13/17/mushrooms-8232731_1280.jpg",
      title: "제목",
      subtitles: ["#레이지로딩", "#예약"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      content: "ㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ",
      commentCount: 10,
      author: "young",
      date: new Date(),
      likes: 7,
    },
    {
      id: 4,
      link: "/post/4",
      src: "https://cdn.pixabay.com/photo/2023/05/14/17/46/ducklings-7993465_1280.jpg",
      title: "제목",
      subtitles: ["#예약"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      content: "ㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ",
      commentCount: 10,
      author: "young",
      date: new Date(),
      likes: 7,
    },
    {
      id: 5,
      link: "/post/5",
      src: "https://cdn.pixabay.com/photo/2023/08/28/23/17/superb-fairywren-8220199_640.jpg",
      title: "제목",
      subtitles: ["#드래그앤드롭"],
      languages: ["#JavaScript", "#Rust", "#Go"],
      content: "ㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ\nㅇㅇㅇㅇㅇㅇㅇ",
      commentCount: 10,
      author: "young",
      date: new Date(),
      likes: 7,
    },
  ];

  const fetchedData = cardData.find((item) => item.id.toString() === postId);

  return (
    <article className={styles.container}>
      {fetchedData ? (
        <div className={styles.post}>
          <header>
            <h2>{fetchedData.title}</h2>
            <div className={styles.subtitles}>
              <span>{fetchedData.subtitles.join(" ")}</span>
            </div>
            <div className={styles.languages}>
              <span>{fetchedData.languages.join(" ")}</span>
            </div>
            <div className={styles.info}>
              <span>{fetchedData.author}</span>
              <span>{fetchedData.date.toString()}</span>
            </div>
          </header>
          {/* {fetchedData.id} */}
          {/* {fetchedData.link} */}
          <div className={styles.content}>
            <Image src={fetchedData.src} alt="post content image" width={300} height={300} />
            {fetchedData.content}
          </div>
          <div className={styles.comment}>
            <div className={styles.counts}>
              <div>댓글 {fetchedData.commentCount}</div>
              <div>❤ {fetchedData.likes}</div>
            </div>
            <form className={styles.form}>
              <div className={styles.thumbnail}>😀</div>
              <div className={styles.write}>
                <div className={styles.account}>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="비밀번호" />
                </div>
                <textarea
                  className={styles.textarea}
                  name=""
                  id=""
                  placeholder="내용을 입력하세요"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>게시물이 존재하지 않습니다.</div>
      )}
    </article>
  );
};

export default Post;
