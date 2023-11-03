import { getServerSession } from 'next-auth';
import React from 'react';

import ManageLikes from '@/containers/ManageLikes/ManageLikes';
import { CustomSession } from '@/types/session';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const ManageLikesRouter = async () => {
  const session: CustomSession | null = await getServerSession(authOptions); // 유저 세션
  const email = session?.user?.email; // 좋아요 버튼에 전달할 email props

  return (
    <div>
      <ManageLikes email={email as string} />
    </div>
  );
};

export default ManageLikesRouter;
