import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/utils/db/db';

// 좋아요 한 게시글을 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const db = (await connectDB).db('blog');
  const postsCollection = db.collection('posts');

  const token = await getToken({ req });
  // 인증되지 않은 유저의 접근
  if (!token) {
    return NextResponse.json({ message: '좋아요 한 포스트: 인증되지 않은 유저입니다.' }, { status: 400 });
  }

  // user가 좋아요 한 게시글 데이터와 status를 응답합니다.
  const foundPosts = await postsCollection.find({ likes: { $elemMatch: { $eq: token.email } } }).toArray();

  if (foundPosts) {
    return NextResponse.json(foundPosts, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
