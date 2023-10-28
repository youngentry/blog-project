'use client';

import { useState, useEffect } from 'react';

import { getCommentsDataApi } from '@/services/commentsFetch';
import { CommentInterface } from '@/types/types';

const useCommentList = (postId: string, newUpdate: boolean = false) => {
  const [commentList, setCommentList] = useState<CommentInterface[]>([]); // API 요청하여 조회할 댓글 목록

  // 게시물의 댓글을 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const res: CommentInterface[] | false = await getCommentsDataApi(postId);
        // 작성 요청 성공 시 불러온 댓글을 state에 저장합니다.
        if (res) {
          setCommentList(res);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId, newUpdate]);

  return { commentList, setCommentList };
};

export default useCommentList;
