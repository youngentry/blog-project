"use client";

import { getManageCommentsApi } from "@/services/manageFetch";
import { Comment } from "@/types/post";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

export interface useManageCommentsInterface {
  comments: Comment[];
  setComments: Dispatch<SetStateAction<any>>;
}

const useManageComments = () => {
  const [comments, setComments] = useState([]); // 댓글 리스트

  // 작성한 댓글 리스트를 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const comments = await getManageCommentsApi();
        // 불러온 댓글 리스트를 state에 저장합니다.
        setComments(comments);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { comments, setComments };
};

export default useManageComments;
