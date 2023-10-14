import { useState, useEffect } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 여부

  useEffect(() => {
    // 3초 후에 loading을 false로 설정
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // 컴포넌트가 unmount 될 때 타이머를 정리
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { loading, setLoading };
};

export default useLoading;
