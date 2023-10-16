import React, { useState } from 'react';

import { addCategoryApi } from '@/services/categoryFetch';
import { CommonCategoryInterface } from '@/types/types';

import { CustomInput } from '@/components/inputs/CustomInputs/CustomInputs';

// 서브 카테고리 추가 폼
const AddSubCategoryForm = ({ mainCategoryId }: { mainCategoryId: string }) => {
  const [addSubCategoryInput, setAddSubCategoryInput] = useState<string>('');

  const addSubCategory = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();

    // submit 성공 시 input 초기화
    const resetInput = () => {
      setAddSubCategoryInput('');
    };

    try {
      // POST 요청을 보냅니다.
      const body: CommonCategoryInterface = {
        role: 'sub',
        parent: parentId,
        title: addSubCategoryInput,
      };

      const res = await addCategoryApi(body);

      // 서브 카테고리 추가요청 성공 시 실행할 함수
      if (res) {
        window.alert('서브 카테고리 추가 성공.');
        resetInput();
      }
    } catch (err) {
      console.error(err);
      window.alert('서브 카테고리 추가 오류가 발생했습니다.');
    }
  };

  const subInputProps = {
    value: addSubCategoryInput,
    maxLength: 20,
    dispatch: setAddSubCategoryInput,
  };

  return (
    <form onSubmit={(e) => addSubCategory(e, mainCategoryId)}>
      <CustomInput placeholder='서브 카테고리 추가하기' {...subInputProps} />
      <button type='submit'>확인</button>
    </form>
  );
};

export default AddSubCategoryForm;
