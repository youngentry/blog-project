import hljs from 'highlight.js';

hljs.configure({ languages: ['javascript', 'python'] });

export const editorModule = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: '#toolbar',
};
