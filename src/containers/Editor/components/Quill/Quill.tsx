import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

import { postImgur } from '@/services/imgurFetch';

import styles from './Quill.module.scss';
import QuillToolbar from '../QuillToolbar/QuillToolbar';

const ERROR = {
  EVENT_KR: '이미지 업로드 작업에 문제가 발생하였습니다.',
  EVENT_EN: 'imgur image event error',
  UPLOAD_KR: '이미지 업로드에 실패하였습니다.',
  UPLOAD_EN: 'imgur image upload error',
};

interface quillProps {
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

// dynamic import. ssr: false 옵션으로 클라이언트에서 동적으로 로드하도록 합니다.
// window와 같은 브라우저 API에 의존할 경우 필요합니다.
const ReactQuill = dynamic(
  async () => {
    // ReactQuillClass 변수에 ReactQuill 컴포넌트 할당
    const { default: ReactQuillClass } = await import('react-quill');

    // 컴포넌트에 ref 속성 주입
    // @ts-ignore
    const RefExtendedQuill = ({ forwardedRef, ...props }) => <ReactQuillClass ref={forwardedRef} {...props} />;
    return RefExtendedQuill;
  },
  { ssr: false },
);

const Quill = (props: quillProps) => {
  const quillRef = useRef();

  const { contents, setContents } = props; // quill input

  // 이미지를 본문의 커서 위치에 <img src="이미지주소"/> 형태로 삽입합니다.
  const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    // 업로드 이벤트 에러
    if (!e.target.files) {
      window.alert(ERROR.EVENT_KR);
      throw Error(ERROR.EVENT_EN);
    }

    // formData 형식으로 body에 전달
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    // imgur 업로드 결과
    const result = await postImgur(formData);
    if (!result) {
      window.alert(ERROR.UPLOAD_KR);
      throw Error(ERROR.UPLOAD_EN);
    }
    const { link } = result.data; // 이미지 링크

    insertImage(link); // 커서 위치에 이미지 태그 삽입
  };

  // 현재 커서 위치에 이미지 태그를 삽입합니다.
  const insertImage = (link: string) => {
    // @ts-ignore
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection();
    editor.insertEmbed(range?.index || Infinity, 'image', link); // cursor가 존재하지 않을 경우에는 본문 마지막에 이미지 추가
  };

  // imgur customized toolbar
  const modules = {
    toolbar: '#toolbar',
  };

  return (
    <div className={styles.quillContainer}>
      <QuillToolbar onFileUpload={onFileUpload} />
      {/* <input type='file' onChange={onFileUpload} /> */}
      <ReactQuill
        forwardedRef={quillRef}
        className={styles.quill}
        value={contents}
        onChange={setContents}
        modules={modules}
        placeholder='내용을 입력해주세요.'
      />
    </div>
  );
};

export default Quill;
