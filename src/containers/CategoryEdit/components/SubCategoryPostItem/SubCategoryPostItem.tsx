"use client";

import { getPostData } from "@/services/postsFetch";
import styles from "./SubCategoryPostItem.module.scss";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/post";

const SubCategoryPostItem = ({ postId }: { postId: string }) => {
  const [postItem, setPostItem] = useState<Post | null>(null);

  useEffect(() => {
    const getSubCategories = async (postId: string) => {
      const res = await getPostData(postId);

      // 메인 카테고리 조회 성공 시 메인 카테고리 목록 반환
      if (res) {
        return res;
      }
    };

    (async () => {
      const postItemData: Post | undefined = await getSubCategories(postId);

      if (postItemData) {
        setPostItem(postItemData);
      }
    })();
  }, []);

  return (
    <>
      {postItem && (
        <li className={styles.postItem}>
          <h6>{postItem.title}</h6>
        </li>
      )}
    </>
  );
};

export default SubCategoryPostItem;
