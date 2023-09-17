"use client";

import React, { useState } from "react";
import Quill from "./Quill/Quill";
import styles from "./Editor.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

const Editor = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitles, setSubtitles] = useState("");
  const [languages, setLanguages] = useState("");
  const [contents, setContents] = useState("");

  const quillProps = {
    contents,
    setContents,
  };

  const handleClickWriteButton = async (e: any) => {
    e.preventDefault();
    console.log("?");
    console.log(contents);
    const result = await axios.post("/api/manage/newpost", {
      title,
      subtitles,
      languages,
      contents,
    });
    console.log(result);
    router.push(`/post/${result.data.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <input
          className={styles.title}
          type="text"
          placeholder="제목"
          value={title}
          minLength={1}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.subtitles}
          type="text"
          placeholder="부제목"
          value={subtitles}
          onChange={(e) => setSubtitles(e.target.value)}
        />
        <input
          className={styles.languages}
          type="text"
          placeholder="languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />
      </div>
      <div className={styles.quillContainer}>
        <Quill {...quillProps} />
      </div>
      <div>
        <button onClick={(e) => handleClickWriteButton(e)}>작성하기</button>
        <button>취소하기</button>
      </div>
    </div>
  );
};

export default Editor;
