import { ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/utils/db/db';
import { checkBlogAdmin } from '@/utils/sessionCheck/checkBlogAdmin';
import { CommonCategoryInterface } from '@/types/types';

// 카테고리 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const role: string | null = searchParams.get('role'); // DB에서 댓글 찾고 수정하기 위한 ObjectId
  const parentId: string | null = searchParams.get('parentId'); // DB에서 댓글 찾고 수정하기 위한 ObjectId

  const db = (await connectDB).db('blog');
  const categoryCollection = db.collection<CommonCategoryInterface>('categories');

  if (role === 'main') {
    // 메인 카테고리 데이터와 status를 응답합니다.
    const foundCategory: CommonCategoryInterface[] = await categoryCollection.find({ role }).toArray();
    if (foundCategory) {
      return NextResponse.json(foundCategory, { status: 200 });
    }
  }

  if (role === 'sub') {
    // 서브 카테고리 데이터와 status를 응답합니다.
    const foundCategory: CommonCategoryInterface | null = await categoryCollection.findOne({
      _id: new ObjectId(parentId as string),
    });
    if (foundCategory) {
      return NextResponse.json(foundCategory, { status: 200 });
    }
  }

  if (!role) {
    //   모든 카테고리 데이터와 status를 응답합니다.
    const foundCategory: CommonCategoryInterface[] = await categoryCollection.find({}).toArray();
    if (foundCategory) {
      return NextResponse.json(foundCategory, { status: 200 });
    }
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};

// 새로운 카테고리 작성 API 입니다.
export const POST = async (req: NextRequest) => {
  // DB와 Collection 연결
  const db = (await connectDB).db('blog');
  const categoryCollection = db.collection('categories');

  const token = await getToken({ req }); // 로그인 유저 정보
  // 로그인 되지 않은 사용자 경고
  if (!token) {
    return NextResponse.json({ message: '카테고리 편집: 유효하지 않은 접근입니다.' }, { status: 400 });
  }

  // admin이 아닌 사용자 경고
  const { email } = token;
  if (!checkBlogAdmin(email as string)) {
    return NextResponse.json({ message: '카테고리 편집: 유효하지 않은 접근입니다.' }, { status: 400 });
  }

  const body: CommonCategoryInterface = await req.json();
  // 요청 받은 카테고리 데이터
  const { role, parent, title } = body;
  let { _id } = body;

  // 메인 추가/수정
  if (role === 'main') {
    _id = _id ? new ObjectId(_id) : '';

    const saveData = {
      _id: new ObjectId(), // 메인 카테고리 id
      title, // 메인 카테고리 이름
      role, // "main"
      children: [], // 서브 카테고리가 추가되는 배열
    };

    // _id가 존재하면 메인 카테고리 수정
    if (_id) {
      const result = await categoryCollection.updateOne({ _id }, { $set: { title } }, { upsert: true }); // DB에 저장한 결과

      if (result) {
        return NextResponse.json({ message: '카테고리 편집: 메인 카테고리 추가 성공.' }, { status: 200 });
      }
    }

    // _id가 존재하지 않으면 메인 카테고리 추가
    const result = await categoryCollection.insertOne({ ...saveData }); // DB에 저장한 결과
    if (result) {
      return NextResponse.json({ message: '카테고리 편집: 메인 카테고리 추가 성공.' }, { status: 200 });
    }
  }

  // 서브 카테고리를 메인 카테고리의 children 배열의 요소로 추가합니다.
  if (role === 'sub') {
    const saveData: any = {
      _id: new ObjectId(),
      ...body,
    };

    const result = await categoryCollection.findOneAndUpdate(
      { _id: new ObjectId(parent) },
      { $addToSet: { children: { ...saveData } } },
    ); // DB에 저장한 결과

    if (result) {
      return NextResponse.json({ message: '카테고리 편집: 서브 카테고리 추가 성공.' }, { status: 200 });
    }
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
