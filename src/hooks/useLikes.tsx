"use client";

import { getManageLikesApi } from "@/services/manageFetch";
import React, { useState, useEffect } from "react";
import useLoading from "./useLoading";

// export interface useManageCommentsInterface {
//   likes: Comment[];
//   setLikes: Dispatch<SetStateAction<any>>;
// }

const useLikes = () => {
  const [likes, setLikes] = useState([]); // 좋아요 한 게시물 리스트
  const { loading, setLoading } = useLoading();

  // 좋아요 한 게시물 리스트를 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const likes = await getManageLikesApi();
        // 게시물 리스트를 state에 저장합니다.
        setLikes(likes);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { likes, setLikes, loading };
};

export default useLikes;
