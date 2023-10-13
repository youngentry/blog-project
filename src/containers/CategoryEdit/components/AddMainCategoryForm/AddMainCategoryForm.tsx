'use client';

import { CustomInput } from '@/components/inputs/CustomInputs/CustomInputs';
import React, { useState } from 'react';
import styles from './AddMainCategoryForm.module.scss';
import { CommonCategoryType } from '@/containers/Editor/PostEditor';
import { addCategoryApi } from '@/services/categoryFetch';

const AddMainCategoryForm = () => {
  const [addMainCategoryInput, setAddMainCategoryInput] = useState<string>('');

  const addMainCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // POST 요청을 보냅니다.
      const body: CommonCategoryType = {
        role: 'main',
        title: addMainCategoryInput,
      };

      const res = await addCategoryApi(body);

      // 댓글 작성요청 성공 시 실행할 함수
      if (res) {
        window.alert('메인 카테고리 추가 성공.');
        successSubmit();
      }
    } catch (err) {
      console.error(err);
      window.alert('메인 카테고리 추가 오류가 발생했습니다.');
    }
  };

  const successSubmit = () => {
    setAddMainCategoryInput('');
  };

  const mainInputProps = {
    value: addMainCategoryInput,
    maxLength: 20,
    dispatch: setAddMainCategoryInput,
  };
  return (
    <div>
      <form onSubmit={(e) => addMainCategory(e)}>
        <CustomInput placeholder={'메인 카테고리 추가하기'} {...mainInputProps} />
        <button>확인</button>
      </form>
    </div>
  );
};

export default AddMainCategoryForm;
