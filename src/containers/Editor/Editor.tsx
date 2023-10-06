"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Quill from "./components/Quill/Quill";
import styles from "./Editor.module.scss";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { editPostData, getPostData } from "@/services/postsFetch";
import { getCategoriesApi } from "@/services/categoryFetch";
import CategorySelector from "./components/CategorySelector/CategorySelector";
import { ObjectId } from "mongodb";

export interface SubCategoryType {
  _id?: string | ObjectId;
  role: string;
  title: string;
  parent?: string;
}

export interface CommonCategoryType extends SubCategoryType {
  children?: SubCategoryType[];
}

export interface CategorySelectorProps {
  categoryList: CommonCategoryType[];
  setCategoryId: Dispatch<SetStateAction<string>>;
  isSelectCategoryVisible: boolean;
  setIsSelectCategoryVisible: Dispatch<SetStateAction<boolean>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
}

// react-quill에 게시물 데이터를 불러오거나, 새롭게 작성하거나 수정한 게시물을 DB에 업데이트합니다.
const Editor = ({ postId, canEdit }: { postId?: string; canEdit?: boolean }) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 합니다.

  const [title, setTitle] = useState(""); // 게시글 제목
  const [categoryId, setCategoryId] = useState<string>("6516f855d44958b59ed7b8d5"); // "카테고리 없음" 메인 카테고리의 디폴트 값입니다.
  const [contents, setContents] = useState(""); // 게시글 내용

  const [categoryList, setCategoryList] = useState<CommonCategoryType[]>([]); // 카테고리 목록
  const [isSelectCategoryVisible, setIsSelectCategoryVisible] = useState<boolean>(false); // 카테고리 드롭메뉴 visible 여부
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("부제목 없음"); // 선택된 카테고리의 디폴트 값입니다.

  // 수정 권한이 없는 경우엔 수정을 시도하려던 게시글로 이동합니다.
  useEffect(() => {
    if (postId && !canEdit) {
      window.alert("수정 권한 없음");
      router.push(`/posts/${postId}`);
    }
  }, []);

  // 카테고리 리스트를 불러옵니다.
  useEffect(() => {
    (async () => {
      const res = await getCategoriesApi();

      // editor에 수정할 게시물 정보 불러오기
      if (res) {
        setCategoryList(res);
        setSelectedSubtitle(res[0].children[0].title); // 카테고리 선택 초기값 설정
      }
    })();
  }, []);

  // postId가 있다면 게시물 데이터를 요청하고, state에 데이터를 저장합니다.
  useEffect(() => {
    if (postId) {
      (async () => {
        const res: Post | false = await getPostData(postId);

        // 수정할 게시물이 존재하지 않을 경우 category로 redirect 합니다.
        if (!res) {
          window.alert("수정할 게시물이 존재하지 않습니다.");
          router.push(`/category`);
        }

        // editor 수정할 게시물 정보 저장
        if (res) {
          setTitle(res.title);
          setSelectedSubtitle(res.subtitle);
          setContents(res.contents);
        }
      })();
    }
  }, []);

  // 수정하기 버튼 클릭하면,
  const handleClickEditButton = async (e: any) => {
    e.preventDefault();
    try {
      const editContents = {
        title,
        subtitle: selectedSubtitle,
        contents,
        categoryId,
      };

      console.log(editContents, selectedSubtitle);

      // postId가 없다면 새로운 글 작성, postId가 있다면 수정 api 요청을 보냅니다.
      const res = await editPostData(postId ? postId : "", editContents);

      // 수정할 게시물이 존재하지 않을 경우
      if (!res) {
        window.alert("수정할 게시물이 존재하지 않습니다.");
        router.push(`/category`);
        return;
      }

      // 게시물로 redirect하기 전 서버를 refresh하여 업데이트 된 DB 데이터를 가져오도록 합니다.
      router.push(`/posts/${res.id}`); // 해당 게시물로 redirect 합니다.
      router.refresh();
    } catch (error) {
      console.error("게시물 수정 오류:", error);
    }
  };

  // 카테고리 선택에 전달할 props
  const categorySelectorProps: CategorySelectorProps = {
    categoryList,
    setCategoryId,
    isSelectCategoryVisible,
    setIsSelectCategoryVisible,
    selectedSubtitle,
    setSelectedSubtitle,
  };

  // quill에 전달할 props
  const quillProps = {
    contents,
    setContents,
  };

  return (
    <>
      {postId && !canEdit ? (
        <div>{null}</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.head}>
            <input
              className={styles.title}
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CategorySelector {...categorySelectorProps} />
          </div>
          <div className={styles.quillContainer}>
            <Quill {...quillProps} />
          </div>
          <div>
            <button onClick={(e) => handleClickEditButton(e)}>작성하기</button>
            <button>취소하기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
