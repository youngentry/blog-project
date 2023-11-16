'use client';

import { RefObject, SetStateAction, useEffect, Dispatch } from 'react';

/**
 * ref로 가리키고 있는 Node의 바깥을 클릭하면 .
 */
const useClickOutside = (ref: RefObject<HTMLElement>, setState: Dispatch<SetStateAction<any>>) => {
  return useEffect(() => {
    // 메뉴 모달의 바깥쪽을 눌렀을 때 실행
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [ref, setState, false]);
};

export default useClickOutside;
