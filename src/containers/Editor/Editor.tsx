"use client";

import React, { useState, useEffect, useRef } from "react";
import Quill from "./Quill/Quill";
import styles from "./Editor.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Cabin_Sketch } from "next/font/google";

const Editor = ({ postId, canEdit }: { postId?: number; canEdit?: boolean }) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 할겁니다.

  const [title, setTitle] = useState("");
  const [subtitles, setSubtitles] = useState("");
  const [contents, setContents] = useState("");

  // 수정 권한이 없는 경우엔 수정을 시도하려던 게시글로 이동합니다.
  useEffect(() => {
    if (!canEdit) {
      window.alert("수정 권한 없음");
      router.push(`/post/${postId}`);
    }
  }, []);

  useEffect(() => {
    if (postId) {
      (async () => {
        const result = await axios.get(`/api/manage/newpost/${postId}`);

        setTitle(result.data.title);
        setSubtitles(result.data.subtitles.join(" "));
        setContents(result.data.contents);
      })();
    }
  }, []);

  // quill에 전달할 state props
  const quillProps = {
    contents,
    setContents,
  };

  // 수정하기 버튼 클릭하면,
  const handleClickEditButton = async (e: any) => {
    e.preventDefault();
    // api 요청을 보내고
    const result = await axios.post(`/api/manage/newpost/${postId}`, {
      title,
      subtitles,
      contents,
      id: postId,
    });

    // 게시물 작성이 완료되면 해당 게시물 주소로 redirect 합니다.
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.subtitles}
          type="text"
          placeholder="부제목"
          value={subtitles}
          onChange={(e) => setSubtitles(e.target.value)}
        />
      </div>
      <div className={styles.quillContainer}>
        <Quill {...quillProps} />
      </div>
      <div>
        <button onClick={(e) => handleClickEditButton(e)}>작성하기</button>
        <button>취소하기</button>
      </div>
    </div>
  );
};

export default Editor;
