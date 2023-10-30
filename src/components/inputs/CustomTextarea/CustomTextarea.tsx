import React, { ChangeEvent, memo, useCallback } from 'react';

import { CustomInputPropsInterface } from '@/types/types';
import { isDangerousLetter } from '@/utils/isDangerousLetter';

import styles from './CustomTextarea.module.scss';

/**
 * 존재하지 않는 textarea 속성은 타입 추가 후에 작성하여야 합니다. 추가할 때 ex) require?: boolean
 * onChange에 setState를 전달하여야 합니다.
 * @param param0
 * @returns
 */
const CustomTextarea = ({
  className,
  placeholder,
  value,
  maxLength,
  dispatch,
  injectionProtected,
}: CustomInputPropsInterface) => {
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    dispatch(inputValue);
  };

  // injectionProtected 속성이 true일 때 검사합니다.
  const handleProtectedOnchange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;

      if (isDangerousLetter(inputValue)) {
        alert('보안: 특수문자(${}[]().)는 입력 할수 없습니다.');
        inputValue.replace(/[${}[\]().]/g, '');
      } else {
        dispatch(e.target.value);
      }
    },
    [dispatch],
  );

  return (
    <textarea
      className={`${className} ${styles.textarea}`}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      required
      onChange={injectionProtected ? handleProtectedOnchange : handleOnChange}
    />
  );
};

export default memo(CustomTextarea);
