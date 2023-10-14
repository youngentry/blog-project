'use client';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';

import styles from './Quill.module.scss';

interface quillProps {
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

// dynamic import. srr: false 옵션으로 클라이언트에서 동적으로 로드하도록 합니다.
// window와 같은 브라우저 API에 의존할 경우 필요합니다.
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Quill = ({ contents, setContents }: quillProps) => {
  const modules = {
    toolbar: {
      container: [
        ['underline', 'strike', 'blockquote'], // 글자 효과
        [{ size: ['small', false, 'large', 'huge'] }], // 글자 크기
        [{ color: [] }, { background: [] }], // 글자 색상, 글자 배경
        ['image', 'video'],
      ],
    },
  };

  return (
    <ReactQuill
      className={styles.quill}
      value={contents}
      onChange={setContents}
      modules={modules}
      placeholder='내용을 입력해주세요.'
    />
  );
};

export default Quill;
