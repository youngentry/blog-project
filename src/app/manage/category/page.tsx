import { getServerSession } from 'next-auth';

import CategoryEdit from '@/containers/CategoryEdit/CategoryEdit';
import { checkIsBlogAdmin } from '@/utils/sessionCheck/checkUserRole';
import { CustomSession } from '@/types/session';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 게시글 작성 페이지(Editor)로 라우트합니다.
const CategoryEditRouter = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const isBlogAdmin = checkIsBlogAdmin(session?.user?.role);
  return (
    <div>
      <CategoryEdit isBlogAdmin={isBlogAdmin} />
    </div>
  );
};

export default CategoryEditRouter;
