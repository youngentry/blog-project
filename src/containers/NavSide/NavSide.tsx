import React from "react";
import styles from "./NavSide.module.scss";

const NavSide = () => {
  const menus = [
    { category: "기능 구현", subjects: ["페이지네이션", "레이지 로딩", "예약 기능"] },
    { category: "시각화/알고리즘", subjects: ["bfs/dfs", "stack/queue", "brute force"] },
    { category: "CS 지식", subjects: ["네트워크", "자료구조", "운영체제"] },
  ];

  return (
    <aside>
      <nav className={styles.sideNav}>
        <div className={styles.profile}>블로그 프로필</div>
        {menus.map((menu) => {
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
        })}
      </nav>
    </aside>
  );
};

export default NavSide;
