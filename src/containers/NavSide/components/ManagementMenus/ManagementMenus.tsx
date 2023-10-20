import { BsChatLeftText, BsFileText } from 'react-icons/bs';
import Link from 'next/link';

import styles from './ManagementMenus.module.scss';

const managements = [
  { id: 1, activity: '블로그', icon: <BsFileText />, menus: [{ href: '/manage/category', title: '카테고리 관리' }] },
  {
    id: 2,
    activity: '내 활동',
    icon: <BsChatLeftText />,
    menus: [
      { href: '/manage/comments', title: '댓글 관리' },
      { href: '/manage/likes', title: '좋아요 관리' },
    ],
  },
];

const ManagementMenus = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.activityBox}>
        {managements.map((management) => {
          return (
            <li key={management.id} className={styles.activityItem}>
              <h3 key={management.id} className={styles.activityName}>
                <i className={styles.activityIcon}>{management.icon}</i>
                {management.activity}
              </h3>
              <ul>
                {management.menus.map((menu) => {
                  return (
                    <li key={menu.title} className={styles.menuItem}>
                      <Link href={menu.href}>
                        <h4 className={styles.menuName}>{menu.title}</h4>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManagementMenus;
