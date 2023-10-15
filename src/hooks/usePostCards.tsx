import { useEffect, useState } from 'react';

import { getPostCardsData } from '@/services/postsFetch';
import { CardInterface } from '@/types/types';
import useLoading from './useLoading';

const usePostCards = (subtitle: string) => {
  const [postCards, setPostCards] = useState<CardInterface[]>([]); // 게시물 카드
  const { loading, setLoading } = useLoading(); // 로딩 상태

  useEffect(() => {
    // 게시물 카드 데이터를 요청하여 state에 저장합니다.
    (async () => {
      try {
        const res: CardInterface[] | [] = await getPostCardsData(subtitle); //
        setPostCards(res);
        setLoading(false); // 비동기 요청이 끝나면 loading 상태롤 false로 전환합니다.
      } catch (err) {
        console.error(err);
      }
    })();
  }, [subtitle, setLoading]);

  return { postCards, setPostCards, loading };
};

export default usePostCards;
