"use client";

import styles from "./NavSideBody.module.scss";
import NavCategory from "./NavCategory/NavCategory";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesApi, getCategoryPostCountApi } from "@/services/categoryFetch";

// 사이드 메뉴의 바디 컴포넌트입니다.
const NavSideBody = () => {
  const [subtitles, setSubtitles] = useState<string[]>([]); // subtitle 배열 ex) ["서브타이틀1", "서브타이틀2"]

  useEffect(() => {
    const getCategoryPostCount = async () => {
      const res = await getCategoryPostCountApi();

      // 카테고리 카운트 조회 성공 시
      if (res) {
        return res;
      }
    };

    (async () => {
      const categoryPostCount = await getCategoryPostCount();
      setSubtitles(categoryPostCount);
    })();
  }, []);
  // const menus = [
  //   { category: "기능 구현", subjects: ["페이지네이션", "레이지 로딩", "예약 기능"] },
  //   { category: "시각화/알고리즘", subjects: ["bfs/dfs", "stack/queue", "brute force"] },
  //   { category: "CS 지식", subjects: ["네트워크", "자료구조", "운영체제"] },
  // ];
  return (
    <div className={styles.container}>
      <Link href={"/category"}>
        <h2>
          <strong>전체 보기</strong>
          <span>{subtitles.length}</span>
        </h2>
      </Link>
      <NavCategory subtitles={subtitles} />
    </div>
  );
};

export default NavSideBody;
