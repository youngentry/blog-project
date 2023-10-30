'use client';

import { useState, useEffect } from 'react';

import { getCommentsDataApi } from '@/services/commentsFetch';
import { CommentInterface } from '@/types/types';
import { sortCommentList } from '@/utils/sortCommentList';

const useCommentList = (postId: string, newUpdate: boolean = false) => {
  const [commentList, setCommentList] = useState<CommentInterface[]>([]); // API 요청하여 조회할 댓글 목록

  // 게시물의 댓글을 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const comments: CommentInterface[] | false = await getCommentsDataApi(postId);
        // 작성 요청 성공 시 불러온 댓글을 state에 저장합니다.
        if (comments) {
          const sortedCommentList = sortCommentList(comments);
          setCommentList(sortedCommentList);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId, newUpdate]);

  return { commentList, setCommentList };
};

export default useCommentList;
