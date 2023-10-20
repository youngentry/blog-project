import { ChangeEvent, RefObject } from 'react';

import { postImgur } from '@/services/imgurFetch';

import styles from './QuillToolbar.module.scss';

const ERROR = {
  EVENT_KR: '이미지 업로드 작업에 문제가 발생하였습니다.',
  EVENT_EN: 'imgur image event error',
  UPLOAD_KR: '이미지 업로드에 실패하였습니다.',
  UPLOAD_EN: 'imgur image upload error',
};

const QuillToolbar = ({ quillRef }: { quillRef: RefObject<any> }) => {
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

  return (
    <div id='toolbar'>
      <span className='ql-formats'>
        <select className='ql-size' defaultValue='medium'>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='large'>Large</option>
          <option value='huge'>Huge</option>
        </select>
        <select className='ql-header'>
          <option value='1'>Header 1</option>
          <option value='2'>Header 2</option>
          <option value='3'>Header 3</option>
          <option value='4'>Header 4</option>
          <option value='5'>Header 5</option>
          <option value='6'>Header 6</option>
        </select>
      </span>
      <span className='ql-formats'>
        <button type='button' className='ql-bold' />
        <button type='button' className='ql-italic' />
        <button type='button' className='ql-underline' />
        <button type='button' className='ql-strike' />
        <button type='button' className='ql-blockquote' />
      </span>
      <span className='ql-formats'>
        <select className='ql-color' />
        <select className='ql-background' />
      </span>
      <span className='ql-formats'>
        <input type='file' className={`${styles.uploadImageButton}`} onChange={onFileUpload} />
      </span>
      <span className='ql-formats'>
        <button type='button' className='ql-code-block' />
        <button type='button' className='ql-clean' />
      </span>
    </div>
  );
};

export default QuillToolbar;
