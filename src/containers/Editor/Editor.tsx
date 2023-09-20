"use client";

import React, { useState, useEffect, useRef } from "react";
import Quill from "./Quill/Quill";
import styles from "./Editor.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

const Editor = ({ postId, canEdit }: { postId?: number; canEdit?: boolean }) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 할겁니다.

  const [title, setTitle] = useState("");
  const [subtitles, setSubtitles] = useState("");
  const [contents, setContents] = useState("");

  // 수정 권한이 없는 경우엔 수정을 시도하려던 게시글로 이동합니다.
  useEffect(() => {
    if (postId && !canEdit) {
      window.alert("수정 권한 없음");
      router.push(`/post/${postId}`);
    }
  }, []);

  useEffect(() => {
    // postId가 있다면 게시물 데이터를 요청하고, state에 데이터를 저장합니다.
    if (postId) {
      (async () => {
        const result = await axios.get(`http://localhost:3000/api/posts/${postId}`);

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
    try {
      // postId가 없다면 새로운 글 작성, postId가 있다면 수정 api 요청을 보냅니다.
      const result = await axios.post(`/api/manage/newpost/${postId ? postId : ""}`, {
        title,
        subtitles,
        contents,
      });

      // 게시물로 redirect하기 전 서버를 refresh하여 업데이트 된 DB 데이터를 가져오도록 합니다.
      router.refresh();
      router.push(`/post/${result.data.id}`); // 해당 게시물로 redirect 합니다.
    } catch (error) {
      console.error("게시물 수정 오류:", error);
    }
  };

  return (
    <>
      {postId && !canEdit ? (
        <div>{null}</div>
      ) : (
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
      )}
    </>
  );
};

export default Editor;
