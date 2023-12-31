import { getServerSession } from 'next-auth';

import { CustomSession } from '@/types/session';
import { checkIsBlogManager } from '@/utils/sessionCheck/checkUserRole';

import styles from './BlogFunctions.module.scss';
import NewPostButton from '@/components/buttons/NewPostButton/NewPostButton';
import UserMenus from '../UserMenu/UserMenu';
import SearchPost from '../SearchPost/SearchPost';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * 상단 네비게이션 우측 메뉴 모음 컴포넌트입니다.
 */
const BlogFunctions = async () => {
  // 로그인 유무를 통해 로그아웃, 로그인 버튼을 조건부 렌더링합니다.
  const session: CustomSession | null = await getServerSession(authOptions);
  const isBlogManager = checkIsBlogManager(session?.user?.role);

  return (
    <div className={styles.blogFunctions}>
      <SearchPost />
      {isBlogManager && <NewPostButton />}
      <UserMenus session={session} />
    </div>
  );
};

export default BlogFunctions;
