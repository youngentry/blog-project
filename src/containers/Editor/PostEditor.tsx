'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { editPostData } from '@/services/postsFetch';
import usePostItem, { UsePostItemInterface } from '@/hooks/usePostItem';
import useCategoryList from '@/hooks/useCategoryList';
import { CommonCategoryInterface } from '@/types/post';

import CategorySelector from './components/CategorySelector/CategorySelector';
import styles from './PostEditor.module.scss';
import Quill from './components/Quill/Quill';
import Spin from '@/components/loadings/Spin/Spin';

export interface CategorySelectorProps {
  categoryList: CommonCategoryInterface[];
  setCategoryId: Dispatch<SetStateAction<string>>;
  isSelectCategoryVisible: boolean;
  setIsSelectCategoryVisible: Dispatch<SetStateAction<boolean>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
}

// react-quill에 게시물 데이터를 불러오거나, 새롭게 작성하거나 수정한 게시물을 DB에 업데이트합니다.
const PostEditor = ({ postId, canEdit }: { postId?: string; canEdit?: boolean }) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 합니다.

  const { postData, loading }: UsePostItemInterface = usePostItem(postId || ''); // 수정하기 에디터에 불러올 게시물 내용
  const { categoryList } = useCategoryList(); // 카테고리 목록

  const [title, setTitle] = useState(''); // 게시글 제목
  const [categoryId, setCategoryId] = useState<string>('6516f855d44958b59ed7b8d5'); // "카테고리 없음" 메인 카테고리의 디폴트 값입니다.
  const [contents, setContents] = useState(''); // 게시글 내용

  const [isSelectCategoryVisible, setIsSelectCategoryVisible] = useState<boolean>(false); // 카테고리 드롭메뉴 visible 여부
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('부제목 없음'); // 선택된 카테고리

  // 수정 권한이 없는 경우엔 수정을 시도하려던 게시글로 이동합니다.
  useEffect(() => {
    if (postId && !canEdit) {
      window.alert('수정 권한 없음');
      router.push(`/posts/${postId}`);
    }
  }, [postId, canEdit, router]);

  // 수정할 게시물이 존재하지 않을 경우 category로 redirect 합니다.
  useEffect(() => {
    if (postId && !loading && !postData) {
      window.alert('수정할 게시물이 존재하지 않습니다.');
      router.push(`/category`);
    }
  }, [router, postId, loading, postData]);

  // editor에 수정할 게시물 정보 저장합니다.
  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setSelectedSubtitle(postData.subtitle);
      setContents(postData.contents);
    }
  }, [loading, postData]);

  // 수정하기 버튼 클릭 이벤트
  const handleClickEditButton = async (e: any) => {
    e.preventDefault();
    try {
      const editContents = {
        title,
        subtitle: selectedSubtitle,
        contents,
        categoryId,
      };

      // postId 여부에 따라 POST 요청을 보내는 api가 다릅니다.
      // postId가 없다면 새로운 글을 작성하고, postId가 있다면 게시글을 수정합니다.
      const res = await editPostData(postId || '', editContents);

      // 수정할 게시물이 존재하지 않을 경우
      if (!res) {
        window.alert('수정할 게시물이 존재하지 않습니다.');
        router.push(`/category`);
        return;
      }

      // 게시물로 redirect하기 전 서버를 refresh하여 업데이트 된 DB 데이터를 가져오도록 합니다.
      router.push(`/posts/${res.id}`); // 해당 게시물로 redirect 합니다.
      router.refresh();
    } catch (error) {
      console.error('게시물 수정 오류:', error);
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
    <div className={styles.container}>
      {postId && loading ? (
        <div className={styles.spinContainer}>
          <Spin size='m' message='에디터를 불러오는 중입니다.' />
        </div>
      ) : postId && (!canEdit || !postData) ? (
        <div>{null}</div>
      ) : (
        <>
          <div className={styles.head}>
            <input
              className={styles.title}
              type='text'
              placeholder='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CategorySelector {...categorySelectorProps} />
          </div>
          <div className={styles.quillContainer}>
            <Quill {...quillProps} />
          </div>
          <div>
            <button onClick={(e) => handleClickEditButton(e)} type='button'>
              작성하기
            </button>
            <button type='button'>취소하기</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostEditor;
