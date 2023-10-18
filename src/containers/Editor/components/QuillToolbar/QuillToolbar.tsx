import styles from './QuillToolbar.module.scss';

const QuillToolbar = ({ onFileUpload }: { onFileUpload: any }) => {
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
        <input type='file' className={`ql-video ${styles.uploadImageButton}`} onChange={onFileUpload} />
      </span>
      <span className='ql-formats'>
        <button type='button' className='ql-clean' />
      </span>
    </div>
  );
};

export default QuillToolbar;
