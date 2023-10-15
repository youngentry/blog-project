import { NextRequest, NextResponse } from 'next/server';

import { CardInterface, PostInterface } from '@/types/types';
import { connectDB } from '@/utils/db/db';

// 게시물 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const subtitle: string | null = searchParams.get('subtitle'); // 카테고리 부제목 이름

  const db = (await connectDB).db('blog');
  const postCollection = db.collection<PostInterface>('posts');

  // searchParams.get()의 결과는 string을 반환하기 떄문에 "undefined"를 검사합니다.
  const query: object = subtitle === 'undefined' ? {} : { subtitle };

  // card에 불필요한 데이터는 제외하고 반환합니다.
  const cardsData: CardInterface[] = await postCollection.find(query, { projection: { content: 0, _id: 0 } }).toArray();
  if (cardsData) {
    return NextResponse.json(cardsData, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
