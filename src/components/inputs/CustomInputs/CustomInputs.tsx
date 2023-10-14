import React, { Dispatch, SetStateAction } from 'react';

import styles from './CustomInputs.module.scss';

interface ReadOnlyInputPropsInterface {
  className?: string;
  placeholder: string;
  value?: string;
}

interface CustomInputPropsInterface {
  className?: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  dispatch: Dispatch<SetStateAction<string>>;
}

/**
 * 읽기 전용 input입니다. 고정된 value 값을 이용합니다.
 * @param placeholder string
 * @param value string 고정 input 값
 * @returns
 */
export const ReadOnlyInput = ({ className, placeholder, value }: ReadOnlyInputPropsInterface) => {
  return <input className={`${className}`} type='text' placeholder={placeholder} value={value} readOnly />;
};

/**
 * onChange에 setState를 전달하여야 합니다.
 * @param dispatch setState
 * @returns
 */
export const CustomInput = (props: CustomInputPropsInterface) => {
  const { className, placeholder, value, maxLength, dispatch } = props;

  // input 초기화 버튼
  const clickInitialize = () => {
    dispatch('');
  };

  return (
    <div className={`${styles.inputBox} ${className}`}>
      <button className={`${styles.reset} ${value.length && styles.visible}`} onClick={clickInitialize} type='button'>
        ❌
      </button>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        required
        onChange={(e) => dispatch(e.target.value)}
      />
    </div>
  );
};

/**
 * 존재하지 않는 textarea 속성은 타입 추가 후에 작성하여야 합니다. 추가할 때 ex) require?: boolean
 * onChange에 setState를 전달하여야 합니다.
 * @param param0
 * @returns
 */
export const CustomTextarea = ({ className, placeholder, value, maxLength, dispatch }: CustomInputPropsInterface) => {
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
