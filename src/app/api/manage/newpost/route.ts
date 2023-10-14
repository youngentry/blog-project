import { JWT, getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/utils/db/db';

interface FormData {
  title: string;
  subtitle: string;
  contents: string;
  categoryId: string;
  src: string;
}

// 새로운 게시물 작성 API 입니다.
export const POST = async (req: NextRequest) => {
  // DB와 Collection 연결
  const db = (await connectDB).db('blog');
  const postCollection = db.collection('posts');
  const countersCollection = db.collection('counters');

  // 게시물 작성 정보 확인
  const token: JWT | null = await getToken({ req }); // 로그인 유저 정보
  const formData: FormData = await req.json(); // 요청 받은 form 데이터

  // 게시물 번호 정보 업데이트하기
  const currentCounter = await countersCollection.findOne({ model: 'posts' });
  await countersCollection.findOneAndUpdate(
    { model: 'posts' },
    { $inc: { number: 1, postCount: 1 } },
    { upsert: true },
  );

  const { title, subtitle, contents, categoryId, src } = formData; // 게시물 내용
  const id = currentCounter ? currentCounter.number + 1 : 1; // 게시물 번호
  const email = token?.email; // 작성자 email
  const author = token?.name; // 작성자 닉네임
  const date = new Date(); // 게시물 작성 시점
  const commentCount = 0; // 댓글
  const likes: string[] = []; // 좋아요

  // DB에 저장할 데이터
  const saveData = {
    id, // 번호
    title, // 제목
    subtitle, // 서브카테고리
    contents, // 본문
    email, // 작성자 이메일
    categoryId, // 게시물 ObjectId
    src: src || 'https://cdn.pixabay.com/photo/2023/09/03/11/13/mountains-8230502_1280.jpg', // 대표이미지 설정하지 않은 경우 디폴트 이미지
    author, // 작성자 닉네임
    date, // 작성 시간
    commentCount, // 댓글 수
    likes, // 좋아요 수
  };

  // DB 저장 결과 반환
  const result = await postCollection.insertOne({ ...saveData });
  if (result) {
    return NextResponse.json({ id }, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
