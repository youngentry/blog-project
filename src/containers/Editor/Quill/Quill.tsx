"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Quill.module.scss";

interface quillProps {
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
}

const Quill = ({ contents, setContents }: quillProps) => {
  const QuillRef = useRef<ReactQuill>();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["image", "video"],
        ],
      },
    }),
    []
  );

  return (
    <ReactQuill
      className={styles.quill}
      ref={(element) => {
        if (element !== null) {
          QuillRef.current = element;
        }
      }}
      value={contents}
      onChange={setContents}
      modules={modules}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
};

export default Quill;
