import React, { memo } from 'react';

import { CustomInputPropsInterface } from '@/types/types';

import styles from './CustomTextarea.module.scss';

/**
 * 존재하지 않는 textarea 속성은 타입 추가 후에 작성하여야 합니다. 추가할 때 ex) require?: boolean
 * onChange에 setState를 전달하여야 합니다.
 * @param param0
 * @returns
 */
const CustomTextarea = ({ className, placeholder, value, maxLength, dispatch }: CustomInputPropsInterface) => {
  return (
    <textarea
      className={`${className} ${styles.textarea}`}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      required
      onChange={(e) => dispatch(e.target.value)}
    />
  );
};

export default memo(CustomTextarea);
