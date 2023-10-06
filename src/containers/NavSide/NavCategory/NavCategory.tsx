import SubCategoryList from "@/containers/CategoryEdit/components/SubCategoryList/SubCategoryList";
import { getCategoriesApi } from "@/services/categoryFetch";
import React, { useEffect, useState } from "react";
import styles from "./NavCategory.module.scss";
import { BsThreeDots } from "react-icons/bs";

const NavCategory = ({ subtitles }: { subtitles: string[] }) => {
  const [mainCategories, setMainCategories] = useState<any[]>([]);

  useEffect(() => {
    const getMainCategories = async () => {
      try {
        const res = await getCategoriesApi("main");

        // 메인 카테고리 조회 성공 시 메인 카테고리 목록 반환
        if (res) {
          return res;
        }
      } catch (error) {
        console.error("Error fetching main categories:", error);
      }
    };

    (async () => {
      const mainCategoryData = await getMainCategories();
      setMainCategories(mainCategoryData);
    })();
  }, []);
  return (
    <ul className={styles.container}>
      {mainCategories.map((main) => {
        const { _id, title } = main;
        return (
          <li key={_id} className={styles.mainCategory}>
            <h4>
              <i className={styles.mainTitleIcon}>
                <BsThreeDots />
              </i>
              <span>{title}</span>
            </h4>
            <SubCategoryList _id={_id} subtitles={subtitles} />
          </li>
        );
      })}
    </ul>
  );
};

export default NavCategory;
