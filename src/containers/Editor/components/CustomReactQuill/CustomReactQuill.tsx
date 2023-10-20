import dynamic from 'next/dynamic';
import { ForwardedRef } from 'react';
import { ReactQuillProps } from 'react-quill';

import { editorModule } from './editorModule';

interface CustomReactQuillPropsInterface extends ReactQuillProps {
  forwardedRef: ForwardedRef<any>;
}

// dynamic import. ssr: false 옵션으로 클라이언트에서 동적으로 로드하도록 합니다.
// window와 같은 브라우저 API에 의존할 경우 필요합니다.
const CustomReactQuill = dynamic(
  async () => {
    // ReactQuillClass 변수에 ReactQuill 컴포넌트 할당
    const { default: ReactQuillClass } = await import('react-quill');

    // 컴포넌트에 ref 속성 주입
    const RefExtendedQuill = ({ forwardedRef, ...props }: CustomReactQuillPropsInterface) => {
      return <ReactQuillClass ref={forwardedRef} {...props} modules={editorModule} />;
    };
    return RefExtendedQuill;
  },
  { ssr: false },
);

export default CustomReactQuill;
