"use client";

import styles from "./NavSideBody.module.scss";
import NavCategory from "./NavCategory/NavCategory";

// 사이드 메뉴의 바디 컴포넌트입니다.
const NavSideBody = () => {
  const menus = [
    { category: "기능 구현", subjects: ["페이지네이션", "레이지 로딩", "예약 기능"] },
    { category: "시각화/알고리즘", subjects: ["bfs/dfs", "stack/queue", "brute force"] },
    { category: "CS 지식", subjects: ["네트워크", "자료구조", "운영체제"] },
  ];
  return (
    <div className={styles.container}>
      <h2>전체 보기</h2>
      <NavCategory />
      {/* {menus.map((menu) => {
        return (
          <ul key={menu.category} className={styles.category}>
            <strong className={styles.strong}>{menu.category}</strong>
            <ul>
              {menu.subjects.map((subject) => {
                return (
                  <li key={subject} className={styles.subject}>
                    <span>{subject}</span>
                  </li>
                );
              })}
            </ul>
          </ul>
        );
      })} */}
    </div>
  );
};

export default NavSideBody;
