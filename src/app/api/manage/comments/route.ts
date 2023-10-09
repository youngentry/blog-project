import { connectDB } from "@/utils/db/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 댓글 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const db = (await connectDB).db("blog");
  const commentsCollection = db.collection("comments");

  const token = await getToken({ req });

  // 인증되지 않은 유저의 접근
  if (!token) {
    return NextResponse.json(
      { message: "댓글 작성한 한 포스트: 인증되지 않은 유저입니다." },
      { status: 400 }
    );
  }

  // user가 작성한 댓글 데이터와 status를 응답합니다.
  const foundComments = await commentsCollection.find({ author: token.email }).toArray();

  if (foundComments) {
    return NextResponse.json(foundComments, { status: 200 });
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
