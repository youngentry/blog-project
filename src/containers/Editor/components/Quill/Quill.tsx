import 'react-quill/dist/quill.snow.css';
import { Dispatch, SetStateAction, useRef } from 'react';

import styles from './Quill.module.scss';
import QuillToolbar from '../QuillToolbar/QuillToolbar';
import CustomReactQuill from '../CustomReactQuill/CustomReactQuill';

interface quillProps {
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

const Quill = (props: quillProps) => {
  const quillRef = useRef();

  const { contents, setContents } = props; // quill input

  return (
    <div className={styles.quillContainer}>
      <QuillToolbar quillRef={quillRef} />
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
