import 'react-quill/dist/quill.snow.css';
import { Dispatch, SetStateAction, useRef } from 'react';

import styles from './Quill.module.scss';
import QuillToolbar from '../QuillToolbar/QuillToolbar';
import CustomReactQuill from '../CustomReactQuill/CustomReactQuill';

interface quillProps {
  IMGUR_CLIENT_ID: string;
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

// 게시물 작성 본문
const Quill = (props: quillProps) => {
  const quillRef = useRef();

  const { IMGUR_CLIENT_ID, contents, setContents } = props; // quill input

  return (
    <div className={styles.quillContainer}>
      <QuillToolbar quillRef={quillRef} IMGUR_CLIENT_ID={IMGUR_CLIENT_ID} />
      <CustomReactQuill
        forwardedRef={quillRef}
        className={styles.quill}
        value={contents}
        onChange={setContents}
        placeholder='내용을 입력해주세요.'
      />
    </div>
  );
};

export default Quill;
