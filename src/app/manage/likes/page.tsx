import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ManageLikes from '@/containers/ManageLikes/ManageLikes';
import { getServerSession } from 'next-auth';
import React from 'react';

const ManageLikesRouter = async () => {
  const session: UserSessionData | null = await getServerSession(authOptions); // 유저 세션
  const email: string | undefined = session?.user.email; // 좋아요 버튼에 전달할 email props

  return (
    <div>
      <ManageLikes email={email as string} />
    </div>
  );
};

export default ManageLikesRouter;
