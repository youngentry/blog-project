import { ObjectId } from 'mongodb';
import { JWT, getToken } from 'next-auth/jwt';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { CommentForm, Comment, Post } from '@/types/post';
import { connectDB } from '@/utils/db/db';
import { checkBlogAdmin } from '@/utils/sessionCheck/checkBlogAdmin';
import { COMMENT_FORM_LENGTH } from '@/constants/COMMENT_LENGTH';
import { Params } from '@/types/session';

// 댓글 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest, { params }: Params) => {
  const { postId } = params; // 게시물 번호

  const db = (await connectDB).db('blog');
  const commentsCollection = db.collection<Comment>('comments');

  // 댓글 조회 결과
  const foundResult: Comment[] = await commentsCollection
    .find({ parentId: Number(postId) }, { projection: { password: 0, parentId: 0 } })
    .toArray();

  // 댓글과 정보와 status를 응답합니다.
  if (foundResult) {
    return NextResponse.json(foundResult, { status: 200 });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};

// 새로운 댓글 작성 API 입니다.
export const POST = async (req: NextRequest, { params }: Params) => {
  const token: JWT | null = await getToken({ req }); // 유저 정보
  const { postId } = params; // 게시물 번호
  const data: CommentForm = await req.json(); // 요청 받은 댓글 작성 form

  const { MIN_NICKNAME, MIN_PASSWORD, MIN_COMMENT, MAX_NICKNAME, MAX_PASSWORD, MAX_COMMENT } = COMMENT_FORM_LENGTH;

  const { nickname, password, comment, title }: CommentForm = data;

  // nickname또는 password를 입력했는지 검사합니다.
  if (!token && (nickname.length < MIN_NICKNAME || password.length < MIN_PASSWORD)) {
    return NextResponse.json({ message: '게스트 댓글: 닉네임 또는 비밀번호를 입력해야합니다.' }, { status: 400 });
  }

  // nickname또는 password가 길이를 초과했는지 검사합니다.
  if (!token && (nickname.length > MAX_NICKNAME || password.length > MAX_PASSWORD)) {
    return NextResponse.json({ message: '닉네임 또는 비밀번호의 길이가 너무 짧습니다.' }, { status: 400 });
  }

  // comment를 입력했는지 검사합니다.
  if (comment.length < MIN_COMMENT) {
    return NextResponse.json({ message: '댓글 작성: 댓글을 입력해야합니다.' }, { status: 400 });
  }

  // comment가 길이를 초과했는지 검사합니다.
  if (comment.length > MAX_COMMENT) {
    return NextResponse.json({ message: '댓글 작성: 댓글의 길이가 500자를 초과했습니다.' }, { status: 400 });
  }

  const hashedPassword: string = await hash(password, 10); // 해시화한 비밀번호

  // DB에 저장할 데이터
  const saveData: Comment = {
    title,
    parentId: Number(postId), // 게시물 번호
    nickname: token ? (token.name as string) : nickname, // 작성자 닉네임
    author: token ? (token.email as string) : '', // 로그인 유저인 경우에는 유저 email을 저장
    password: token ? '' : hashedPassword, // 게스트 댓글의 경우에는 댓글 비밀번호를 저장
    comment, // 댓글 내용
    date: new Date(), // 작성 시간
    thumbnail: '', // 댓글 옆에 표시되는 이미지 주소
    isLoggedIn: !!token, // 게스트 댓글 or 유저 댓글 여부
  };

  // 댓글 작성 결과
  const db = (await connectDB).db('blog');
  const commentsCollection = db.collection<Comment>('comments');
  const insertResult = await commentsCollection.insertOne({ ...saveData });

  // 게시물의 댓글 갯수를 +1 업데이트 합니다.
  const postsCollection = db.collection<Post>('posts');
  const commentCountUpdateResult = await postsCollection.findOneAndUpdate(
    { id: Number(postId) },
    { $inc: { commentCount: 1 } },
  );

  // 업데이트 결과 응답
  if (insertResult && commentCountUpdateResult) {
    return NextResponse.json({ id: postId }, { status: 200 }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};

// 댓글 수정 API 입니다.
export const PATCH = async (req: NextRequest, { params }: Params) => {
  const token: JWT | null = await getToken({ req }); // 유저 정보
  const { postId } = params; // 게시물 번호

  const data = await req.json();
  const { comment }: { comment: string } = data; // 요청 받은 수정 comment

  const { searchParams } = new URL(req.url);
  const _id: string | null = searchParams.get('_id'); // DB에서 댓글 찾고 수정하기 위한 _id

  // 댓글의 조회에 실패한 경우 에러 반환
  if (!_id) {
    return NextResponse.json({ message: '댓글 수정: 댓글 _id 조회에 실패하였습니다.' }, { status: 400 });
  }

  // DB에서 댓글 작성자 정보 확인
  const db = (await connectDB).db('blog');
  const commentsCollection = db.collection<Comment>('comments');
  const foundResult = await commentsCollection.findOne({ _id: new ObjectId(_id) });

  // 삭제할 댓글이 DB에 존재하지 않을 경우
  if (!foundResult) {
    return NextResponse.json({ message: '댓글 수정: 수정할 댓글을 찾을 수 없습니다.' }, { status: 400 });
  }

  // 로그인 유저일 경우 블로그 관리자가 아니거나, 동일한 작성자가 아닐 경우 400 응답
  if (token) {
    const isBlogAdmin = checkBlogAdmin(token.email as string);
    const isSameAuthor = token.email === foundResult.author;
    if (!isBlogAdmin && !isSameAuthor) {
      return NextResponse.json({ message: '댓글 수정: 수정 권한이 없습니다.' }, { status: 400 });
    }
  }

  // 수정 결과 응답
  const editResult = await commentsCollection.updateOne({ _id: new ObjectId(_id) }, { $set: { comment } });
  if (editResult) {
    return NextResponse.json({ id: postId }, { status: 200 }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};

// 댓글 삭제 API 입니다.
export const DELETE = async (req: NextRequest, { params }: Params) => {
  const token: JWT | null = await getToken({ req }); // 유저 정보
  const { searchParams } = new URL(req.url); // 댓글의 ObjectId 쿼리 ?_id=
  const _id: string | null = searchParams.get('_id'); // DB에서 댓글 찾고 수정하기 위한 _id
  const { postId } = params; // 게시물 번호

  // 댓글의 조회에 실패한 경우 에러 반환
  if (!_id) {
    return NextResponse.json({ message: '댓글 삭제: 댓글 조회에 실패하였습니다.' }, { status: 400 });
  }

  // DB에서 댓글 작성자 정보 확인
  const db = (await connectDB).db('blog');
  const commentsCollection = db.collection<Comment>('comments');
  const foundResult = await commentsCollection.findOne({ _id: new ObjectId(_id) });

  // 삭제할 댓글이 DB에 존재하지 않을 경우 에러 반환
  if (!foundResult) {
    return NextResponse.json({ message: '댓글 삭제: 댓글 조회에 실패하였습니다.' }, { status: 400 });
  }

  // 로그인 유저일 경우 블로그 관리자가 아니거나, 동일한 작성자가 아닐 경우 400 응답
  if (token) {
    const isBlogAdmin = checkBlogAdmin(token.email as string);
    const isSameAuthor = token.email === foundResult.author;
    if (!isBlogAdmin && !isSameAuthor) {
      return NextResponse.json({ message: '댓글 삭제: 수정 권한이 없습니다.' }, { status: 400 });
    }
  }

  // 게시물 댓글 갯수를 -1 업데이트합니다.
  const postsCollection = db.collection<Post>('posts');
  const commentCountUpdateResult = await postsCollection.findOneAndUpdate(
    { id: Number(postId) },
    { $inc: { commentCount: -1 } },
  );

  // 삭제 결과 응답
  const deleteResult = await commentsCollection.deleteOne({ _id: new ObjectId(_id) });
  if (deleteResult && commentCountUpdateResult) {
    return NextResponse.json({}, { status: 200 });
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};
