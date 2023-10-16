'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import usePostItem, { UsePostItemInterface } from '@/hooks/usePostItem';
import useCategoryList, { UseCategoryInterface } from '@/hooks/useCategoryList';

import styles from './PostEditor.module.scss';
import Quill from './components/Quill/Quill';
import Spin from '@/components/loadings/Spin/Spin';
import ConfirmEditPost from './components/ConfirmEditPost/ConfirmEditPost';
import EditorHead from './components/EditorHead/EditorHead';

// react-quill에 게시물 데이터를 불러오거나, 새롭게 작성하거나 수정한 게시물을 DB에 업데이트합니다.
const PostEditor = ({ canEdit }: { canEdit?: boolean }) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 합니다.

  const { postId }: Params = useParams();

  const { postData, loading }: UsePostItemInterface = usePostItem(postId || ''); // 수정하기 에디터에 불러올 게시물 내용
  const { categoryList }: UseCategoryInterface = useCategoryList(); // 카테고리 목록

  const [title, setTitle] = useState(''); // 게시글 제목
  const [mainCategoryId, setMainCategoryId] = useState<string>('6516f855d44958b59ed7b8d5'); // "카테고리 없음" 메인 카테고리의 디폴트 값입니다.
  const [contents, setContents] = useState(''); // 게시글 내용
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

  if (postId && loading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size='m' message='에디터를 불러오는 중입니다.' />
      </div>
    );
  }

  // Editor Head props
  const editorHeadProps = {
    title,
    setTitle,
    categoryList,
    setMainCategoryId,
    selectedSubtitle,
    setSelectedSubtitle,
  };

  // Quill props
  const quillProps = {
    contents,
    setContents,
  };

  // ConfirmEditPost props
  const confirmEditPostProps = {
    title,
    subtitle: selectedSubtitle,
    contents,
    mainCategoryId,
    postId,
  };

  return (
    <div className={styles.container}>
      {postId && (!canEdit || !postData) ? null : (
        <>
          <EditorHead {...editorHeadProps} />
          <Quill {...quillProps} />
          <ConfirmEditPost {...confirmEditPostProps} />
        </>
      )}
    </div>
  );
};

export default PostEditor;
