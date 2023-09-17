"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Quill.module.scss";

interface quillProps {
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
}

const Quill = ({ contents, setContents }: quillProps) => {
  const modules = {
    toolbar: {
      container: [
        ["underline", "strike", "blockquote"], // 글자 효과
        [{ size: ["small", false, "large", "huge"] }], // 글자 크기
        [{ color: [] }, { background: [] }], // 글자 색상, 글자 배경
        ["image", "video"],
      ],
    },
  };

  return (
    <ReactQuill
      className={styles.quill}
      value={contents}
      onChange={setContents}
      modules={modules}
      placeholder="내용을 입력해주세요."
    />
  );
};

export default Quill;
