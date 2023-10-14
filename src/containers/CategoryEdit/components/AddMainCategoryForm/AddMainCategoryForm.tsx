'use client';

import React, { useState } from 'react';

import { addCategoryApi } from '@/services/categoryFetch';
import { CommonCategoryInterface } from '@/types/post';

import { CustomInput } from '@/components/inputs/CustomInputs/CustomInputs';
// import styles from './AddMainCategoryForm.module.scss';

const AddMainCategoryForm = () => {
  const [addMainCategoryInput, setAddMainCategoryInput] = useState<string>('');

  // submit 성공 시 초기화
  const successSubmit = () => {
    setAddMainCategoryInput('');
  };

  const addMainCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // POST 요청을 보냅니다.
      const body: CommonCategoryInterface = {
        role: 'main',
        title: addMainCategoryInput,
      };

      const res = await addCategoryApi(body);

      // 메인 카테고리 추가 작성요청 성공 시 실행
      if (res) {
        window.alert('메인 카테고리 추가 성공.');
        successSubmit();
      }
    } catch (err) {
      console.error(err);
      window.alert('메인 카테고리 추가 오류가 발생했습니다.');
    }
  };

  const mainInputProps = {
    value: addMainCategoryInput,
    maxLength: 20,
    dispatch: setAddMainCategoryInput,
  };
  return (
    <div>
      <form onSubmit={(e) => addMainCategory(e)}>
        <CustomInput placeholder='메인 카테고리 추가하기' {...mainInputProps} />
        <button type='submit'>확인</button>
      </form>
    </div>
  );
};

export default AddMainCategoryForm;
