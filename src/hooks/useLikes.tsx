'use client';

import { useState, useEffect } from 'react';

import { getManageLikesApi } from '@/services/manageFetch';
import useLoading from './useLoading';
import { PostInterface } from '@/types/types';

const useLikes = () => {
  const [likes, setLikes] = useState<PostInterface[]>([]); // 좋아요 한 게시물 리스트
  const { loading, setLoading } = useLoading();

  // 좋아요 한 게시물 리스트를 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const likesResponse = await getManageLikesApi();
        // 게시물 리스트를 state에 저장합니다.
        setLikes(likesResponse);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setLoading]);

  return { likes, setLikes, loading };
};

export default useLikes;
