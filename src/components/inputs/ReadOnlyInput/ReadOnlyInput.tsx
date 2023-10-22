import React, { memo } from 'react';

interface Props {
  className?: string;
  placeholder: string;
  value?: string;
}

/**
 * 읽기 전용 input입니다. 고정된 value 값을 이용합니다.
 * @param placeholder string
 * @param value string 고정 input 값
 * @returns
 */
const ReadOnlyInput = ({ className, placeholder, value }: Props) => {
  return <input className={`${className}`} type='text' placeholder={placeholder} value={value} readOnly />;
};

export default memo(ReadOnlyInput);
