import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { getPostItemData } from '@/services/postsFetch';
import { PostInterface } from '@/types/types';
import useLoading from './useLoading';

export interface UsePostItemInterface {
  postData: PostInterface | undefined;
  setPostData: Dispatch<SetStateAction<PostInterface | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const usePostItem = (postId: string) => {
  const [postData, setPostData] = useState<PostInterface | undefined>(); // 게시물 데이터
  const { loading, setLoading } = useLoading(); // 로딩 상태

  useEffect(() => {
    // 게시물 id 쿼리로 데이터를 요청하여 state에 저장합니다.
    (async () => {
      try {
        // postId가 없다면 새 게시물 작성이므로 요청을 보내지 않고 바로 loading을 종료합니다.
        if (!postId) {
          throw Error;
        }

        const res: PostInterface | undefined = await getPostItemData(postId);
        if (res) {
          setPostData(res); // 게시물 데이터 저장
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    })();
  }, [postId, setLoading]);

  return { postData, setPostData, loading, setLoading };
};

export default usePostItem;
