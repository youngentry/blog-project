import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { ObjectId } from 'mongodb';

import { CommentInterface, PostInterface } from '@/types/post';
import { connectDB } from '@/utils/db/db';
import { Params } from '@/types/session';

// 게스트 댓글 삭제 API 입니다.
export const POST = async (req: NextRequest, { params }: Params) => {
  const { postId } = params; // 게시물 번호
  const data = await req.json();
  const { password } = data; // 입력받은 댓글삭제 확인 password

  const { searchParams } = new URL(req.url); // 댓글의 ObjectId 쿼리 ?_id=
  const _id: string | null = searchParams.get('_id'); // 삭제할 댓글 id

  // 삭제할 댓글이 DB에 존재하지 않을 경우 에러 반환
  if (!_id) {
    return NextResponse.json({ message: '게스트 댓글 삭제: 댓글 조회에 실패하였습니다.' }, { status: 400 });
  }

  // DB에 연결합니다.
  const db = (await connectDB).db('blog');
  const commentsCollection = db.collection<CommentInterface>('comments');
  const foundComment = await commentsCollection.findOne({ _id: new ObjectId(_id) }); // DB에서 조회한 댓글

  // 찾는 댓글이 DB에 존재하지 않을 경우
  if (!foundComment) {
    return NextResponse.json({ message: '게스트 댓글 삭제: 댓글을 조회할 수  없습니다.' }, { status: 400 });
  }

  // 댓글 비밀번호 일치 여부 검사
  const isValidPassword = await compare(password, foundComment.password);

  // 입력한 비밀번호가 다른 경우 에러 반환
  if (!isValidPassword) {
    return NextResponse.json({ message: '게스트 댓글 삭제: 비밀번호가 다릅니다.' }, { status: 400 });
  }

  // DB에서 댓글 삭제
  const deleteResult = await commentsCollection.deleteOne({ _id: new ObjectId(_id) });

  // 게시물 댓글갯수 정보 -1 업데이트
  const postsCollection = db.collection<PostInterface>('posts');
  const commentCountUpdateResult = await postsCollection.findOneAndUpdate(
    { id: Number(postId) },
    { $inc: { commentCount: -1 } },
  );

  if (deleteResult && commentCountUpdateResult) {
    return NextResponse.json({ message: '댓글 삭제 완료.' }, { status: 200 });
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
