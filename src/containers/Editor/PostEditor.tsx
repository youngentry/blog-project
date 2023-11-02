'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import usePostItem, { UsePostItemInterface } from '@/hooks/usePostItem';
import useCategoryList, { UseCategoryInterface } from '@/hooks/useCategoryList';
import useAlertAndRedirect from '@/hooks/useAlertAndRedirect';
import { ALERT_MESSAGE } from '@/constants/DESCRIPTION';

import styles from './PostEditor.module.scss';
import Quill from './components/Quill/Quill';
import Spin from '@/components/loadings/Spin/Spin';
import ConfirmEditPost from './components/ConfirmEditPost/ConfirmEditPost';
import EditorHead from './components/EditorHead/EditorHead';

// react-quill에 게시물 데이터를 불러오거나, 새롭게 작성하거나 수정한 게시물을 DB에 업데이트합니다.
const PostEditor = ({ canEdit }: { canEdit?: boolean }) => {
  const { postId }: Params = useParams();

  const { postData, loading }: UsePostItemInterface = usePostItem(postId || ''); // 수정하기 에디터에 불러올 게시물 내용
  const { categoryList }: UseCategoryInterface = useCategoryList(); // 카테고리 목록

  const [title, setTitle] = useState(postData?.title || ''); // 게시글 제목
  const [mainCategoryId, setMainCategoryId] = useState<string>(postData?.categoryId || '6516f855d44958b59ed7b8d5'); // "카테고리 없음" 메인 카테고리의 디폴트 값입니다.
  const [contents, setContents] = useState(postData?.contents || ''); // 게시글 내용
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>(postData?.subtitle || '부제목 없음'); // 선택된 카테고리

  // editor에 수정할 게시물 정보를 불러옵니다.
  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setSelectedSubtitle(postData.subtitle);
      setContents(postData.contents);
    }
  }, [postData]);

  // 유효한 접근이 아닌 경우 redirect 합니다.
  const isEditableUser = postId && !canEdit; // 수정 가능 여부 검사
  const isExistPost = postId && !loading && !postData; // 수정할 게시물 데이터 검사
  const redirectToPostLink = `/posts/${postId}`;
  const redirectToCategoryLink = `/category`;
  useAlertAndRedirect(isEditableUser, redirectToPostLink, ALERT_MESSAGE.NOT_EDITABLE);
  useAlertAndRedirect(isExistPost, redirectToCategoryLink, ALERT_MESSAGE.NO_POST);

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

  // 로딩 컴포넌트
  // quill을 dynamic 옵션으로 로드하도록 하고 있기 때문에 css가 적용이 늦습니다.
  // UX 개선을 위해 quill을 미리 로드하도록 하여 css가 적용된 모습을 바로 보여주도록 합니다.
  if (loading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size='m' message='에디터를 불러오는 중입니다.' />
        <div className={styles.quillBox}>
          <Quill {...quillProps} />
        </div>
      </div>
    );
  }

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
