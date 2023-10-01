"use client";

import React, { useEffect, useState } from "react";
import styles from "./SubCategoryList.module.scss";
import { getCategoriesApi } from "@/services/editCategoryFetch";
import Link from "next/link";

const SubCategoryList = ({ _id }: { _id: string }) => {
  const [subCategories, setSubCategories] = useState<any[]>([]);

  useEffect(() => {
    const getSubCategories = async (parentId: string) => {
      const res = await getCategoriesApi("sub", parentId);
      // 메인 카테고리 조회 성공 시 메인 카테고리 목록 반환
      if (res) {
        return res.children;
      }
    };

    (async () => {
      const subCategoryData = await getSubCategories(_id);
      setSubCategories(subCategoryData);
    })();
  }, []);

  return (
    <ul className={styles.subTitleBox}>
      {subCategories.map((sub) => {
        const { _id, title } = sub;
        return (
          <li key={_id} className={styles.subTitleItem}>
            <Link href={{ pathname: "/category", query: { subtitle: title } }} passHref>
              <h5>- {title}</h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubCategoryList;
