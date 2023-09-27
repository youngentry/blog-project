import { connectDB } from "@/utils/db/db";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";
import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 게시물 삭제 API 입니다.
export const DELETE = async (req: NextRequest, { params }: Params) => {
  // 게시물 번호
  const { postId } = params;

  // 로그인 유저정보 확인
  const token: JWT | null = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: "게시물 삭제: 로그인 되지 않은 유저입니다." }, { status: 400 });
  }

  const userEmail = token.email as string; // 로그인 유저 email
  // DB와 Collection 연결
  const db = (await connectDB).db("blog");
  const postCollection = await db.collection("posts");

  const foundPost = await postCollection.findOne({ id: Number(postId) });
  const postAuthorEmail = foundPost?.email;
  const isBlogAdmin = checkBlogAdmin(userEmail);
  // 로그인 유저와 게시글 작성자가 다른지 확인 && 블로그 관리자가 아닌지 확인
  if (userEmail !== postAuthorEmail && !isBlogAdmin) {
    return NextResponse.json({ message: "게시물 삭제: 유효한 접근이 아닙니다." }, { status: 400 });
  }

  // DB에서 게시물 삭제 시도
  const result = await postCollection.deleteOne({ id: Number(postId) });

  // 삭제 결과 응답
  if (result) {
    return NextResponse.json({ message: "게시물이 삭제 되었습니다." }, { status: 200 }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
