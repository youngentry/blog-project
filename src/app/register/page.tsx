import { getServerSession } from 'next-auth';

import Register from '@/containers/Register/Register';

// 가입하기 페이지로 라우트합니다.
const RegisterRouter = async () => {
  const session = await getServerSession();
  const isLoggedIn = !!session;
  return (
    <div>
      <Register isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default RegisterRouter;
