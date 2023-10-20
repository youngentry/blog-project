import hljs from 'highlight.js';

hljs.configure({ languages: ['javascript', 'python'] });

// quill에 전달할 속성
export const editorModule = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: '#toolbar',
};
