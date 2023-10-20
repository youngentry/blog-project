import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAlertAndRedirect = (condition: boolean, alertMessage: string, redirectTo: string) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 합니다.

  useEffect(() => {
    if (condition) {
      window.alert(alertMessage);
      router.push(redirectTo);
    }
  }, [condition, alertMessage, redirectTo, router]);

  return null;
};

export default useAlertAndRedirect;
