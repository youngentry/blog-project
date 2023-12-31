import { NextResponse } from 'next/server';

import { CardInterface, PostInterface } from '@/types/types';
import { connectDB } from '@/utils/db/db';

// 게시물의 서브 카테고리 배열을 불러오는 API입니다.
export const GET = async () => {
  const db = (await connectDB).db('blog');
  const postCollection = db.collection<PostInterface>('posts');

  const cardsData: CardInterface[] = await postCollection.find({}).toArray();

  // subtitle을 담은 배열을 반환합니다. ex) ['서브1-1', '서브1-2', '서브2-1']
  const postSubtitleList: string[] = cardsData.map((eachCard) => eachCard.subtitle);
  if (postSubtitleList) {
    return NextResponse.json(postSubtitleList, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
