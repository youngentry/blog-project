import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/utils/db/db';
import { Params } from '@/types/session';

// 게시물 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest, { params }: Params) => {
  const { postId } = params; // 게시물 번호

  const db = (await connectDB).db('blog');
  const postCollection = db.collection('posts');

  // 게시물 정보를 불러옵니다.
  const post = await postCollection.findOne({ id: Number(postId) }, { projection: { _id: 0 } });

  // 해당 게시물이 존재한다면 데이터와 status를 응답합니다.
  if (post) {
    return NextResponse.json(post, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
