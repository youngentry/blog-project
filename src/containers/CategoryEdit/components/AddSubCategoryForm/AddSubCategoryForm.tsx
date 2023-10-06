import React, { useState } from "react";
import styles from "./AddSubCategoryForm.module.scss";
import { CustomInput } from "@/components/inputs/CustomInputs/CustomInputs";
import { CommonCategoryType } from "@/containers/Editor/PostEditor";
import { addCategoryApi } from "@/services/categoryFetch";

const AddSubCategoryForm = ({ _id }: { _id: string }) => {
  const [addSubCategoryInput, setAddSubCategoryInput] = useState<string>("");

  const addSubCategory = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();

    try {
      // POST 요청을 보냅니다.
      const body: CommonCategoryType = {
        role: "sub",
        parent: parentId,
        title: addSubCategoryInput,
      };

      const res = await addCategoryApi(body);

      // 서브 카테고리 추가요청 성공 시 실행할 함수
      if (res) {
        window.alert("서브 카테고리 추가 성공.");
        successSubmit();
      }
    } catch (err) {
      console.error(err);
      window.alert("서브 카테고리 추가 오류가 발생했습니다.");
    }
  };

  const successSubmit = () => {
    setAddSubCategoryInput("");
  };

  const subInputProps = {
    value: addSubCategoryInput,
    maxLength: 20,
    dispatch: setAddSubCategoryInput,
  };

  return (
    <form onSubmit={(e) => addSubCategory(e, _id)}>
      <label>
        <CustomInput placeholder={"서브 카테고리 추가하기"} {...subInputProps} />
        <button>확인</button>
      </label>
    </form>
  );
};

export default AddSubCategoryForm;
