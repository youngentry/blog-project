import { NextRequest, NextResponse } from 'next/server';

import { CardInterface, PostInterface } from '@/types/types';
import { connectDB } from '@/utils/db/db';

// 게시물 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const title: string = searchParams.get('title') || ''; // 게시물 제목 검색어
  const subtitle: string = searchParams.get('subtitle') || ''; // 카테고리 부제목 이름
  const author: string = searchParams.get('author') || ''; // 게시물 작성자 이름

  const isQueryExist = title || subtitle || author; // query 존재 여부

  type ConditionType = {
    title: {
      $regex: string;
      $options: string;
    };
  };

  type QueryType = {
    $or: (ConditionType | { subtitle: string } | { author: string })[];
  };

  const query: QueryType = { $or: [] };
  const conditionList = query.$or; // 검색 조건

  // query가 있다면 검색 조건에 추가합니다
  if (title) {
    conditionList.push({
      title: {
        $regex: title,
        $options: 'i', // 대소문자 포함
      },
    });
  }
  if (subtitle) conditionList.push({ subtitle });
  if (author) conditionList.push({ author });

  const db = (await connectDB).db('blog');
  const postCollection = db.collection<PostInterface>('posts');

  // card에 불필요한 데이터는 제외하고 반환합니다.
  const cardsData: CardInterface[] = await postCollection
    .find(isQueryExist ? query : {}, { projection: { content: 0, _id: 0 } })
    .toArray();

  if (cardsData) {
    return NextResponse.json(cardsData, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
