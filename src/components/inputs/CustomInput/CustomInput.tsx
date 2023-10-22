import React, { memo } from 'react';
import { BsXLg } from 'react-icons/bs';

import { CustomInputPropsInterface } from '@/types/types';

import styles from './CustomInput.module.scss';

/**
 * onChange에 setState를 전달하여야 합니다.
 * @param dispatch setState
 * @returns
 */
const CustomInput = (props: CustomInputPropsInterface) => {
  const { className, placeholder, value, maxLength, dispatch, inputType } = props;

  // input 초기화 버튼
  const clickInit = () => dispatch('');

  return (
    <div className={`${styles.inputBox} ${className}`}>
      <button className={`${styles.reset} ${value.length && styles.visible}`} onClick={clickInit} type='button'>
        <BsXLg />
      </button>
      <input
        type={`${inputType || 'text'}`}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        required
        onChange={(e) => dispatch(e.target.value)}
      />
    </div>
  );
};

export default memo(CustomInput);
