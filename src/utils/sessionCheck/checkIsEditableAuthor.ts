import { getServerSession } from 'next-auth';

import BASE_URL from '@/constants/BASE_URL';
import { CustomSession } from '@/types/session';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { checkIsBlogAdmin } from './checkUserRole';

// 게시글 수정 권한이 있는지 확인합니다.
export const checkIsEditableAuthor = async (postId: string) => {
  // 게시글을 작성한 유저를 확인합니다.
  const result = await fetch(`${BASE_URL}/posts/${postId}`, { method: 'GET' });
  const jsonData = await result.json();
  const postEmail = jsonData.email;

  // 로그인한 유저를 확인합니다.
  const session: CustomSession | null = await getServerSession(authOptions);

  // session 정보가 없는 경우 false 반환
  if (!session?.user) {
    return false;
  }

  const userRole = session?.user?.role;
  const userEmail = session?.user?.email;
  const isSameAuthor = postEmail === userEmail;

  // 접속 권한을 확인합니다.
  const isBlogAdmin = checkIsBlogAdmin(userRole);
  const canEdit: boolean = isSameAuthor || isBlogAdmin;

  return canEdit;
};
