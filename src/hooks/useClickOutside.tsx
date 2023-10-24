'use client';

import { RefObject, SetStateAction, useEffect, Dispatch } from 'react';

/**
 * ref로 가리키고 있는 Node의 바깥을 클릭하면 setState에 value를 넣어 실행합니다.
 */
const useClickOutside = (ref: RefObject<HTMLElement>, value: any, setState: Dispatch<SetStateAction<any>>) => {
  return useEffect(() => {
    // 메뉴 모달의 바깥쪽을 눌렀을 때 실행
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setState(value);
      }
    };

    // event 실행
    document.addEventListener('mousedown', clickOutside);

    // 컴포넌트 해제되면 이벤트 삭제
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [ref, setState, value]);
};

export default useClickOutside;
