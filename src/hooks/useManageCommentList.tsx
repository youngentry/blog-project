'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { getManageCommentsApi } from '@/services/manageFetch';
import { CommentInterface } from '@/types/types';
import useLoading from './useLoading';

export interface useManageCommentsInterface {
  commentList: CommentInterface[];
  setCommentList: Dispatch<SetStateAction<CommentInterface[]>>;
  loading?: boolean;
}

const useManageComments = () => {
  const [commentList, setCommentList] = useState<CommentInterface[]>([]); // 댓글 리스트
  const { loading, setLoading } = useLoading();

  // 작성한 댓글 리스트를 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const commentsResponse = await getManageCommentsApi();
        // 불러온 댓글 리스트를 state에 저장합니다.
        setCommentList(commentsResponse);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setLoading]);

  return { commentList, setCommentList, loading, setLoading };
};

export default useManageComments;
