import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 *
 * @param {boolean} isAllowed 권한 여부를 인자로 전달합니다
 * @param {string} redirectTo 이동할 경로
 * @param {string?} alertMessage alert에 출력할 메시지
 * @returns
 */
const useAlertAndRedirect = (isAllowed: boolean, redirectTo: string, alertMessage?: string) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 합니다.

  useEffect(() => {
    if (isAllowed) {
      return;
    }

    if (alertMessage) {
      window.alert(alertMessage);
    }
    router.push(redirectTo);
  }, [isAllowed, alertMessage, redirectTo, router]);
};

export default useAlertAndRedirect;
