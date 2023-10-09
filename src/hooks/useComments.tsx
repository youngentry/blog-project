"use client";

import { getManageCommentApi } from "@/services/manageFetch";
import { Comment } from "@/types/post";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

export interface UseCommentsInterface {
  comments: Comment[];
  setComments: Dispatch<SetStateAction<any>>;
}

const useComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const comments = await getManageCommentApi();
        setComments(comments);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { comments, setComments };
};

export default useComments;
