import React, { ChangeEvent, memo, useCallback } from 'react';
import { BsXLg } from 'react-icons/bs';

import { CustomInputPropsInterface } from '@/types/types';
import { isDangerousLetter } from '@/utils/isDangerousLetter';

import styles from './CustomInput.module.scss';

/**
 * onChange에 setState를 전달하여야 합니다.
 * @param dispatch setState
 * @returns
 */
const CustomInput = (props: CustomInputPropsInterface) => {
  const { className, placeholder, value, maxLength, dispatch, inputType, onKeyDown, inputRef, injectionProtected } =
    props;

  // input 초기화 버튼
  const clickInit = () => dispatch('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(inputValue);
  };

  // injectionProtected 속성이 true일 때 검사합니다.
  const handleProtectedOnchange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className={`${styles.inputBox} ${className}`}>
      <button className={`${styles.reset} ${value.length && styles.visible}`} onClick={clickInit} type='button'>
        <BsXLg />
      </button>
      <input
        ref={inputRef}
        type={`${inputType || 'text'}`}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        required
        onChange={injectionProtected ? handleProtectedOnchange : handleOnChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default memo(CustomInput);
