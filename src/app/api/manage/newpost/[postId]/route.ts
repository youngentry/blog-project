import { connectDB } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

// 게시물 수정 API 입니다.
export const POST = async (req: NextRequest, { params }: Params) => {
  const { postId } = params;

  // DB와 Collection 연결
  const db = (await connectDB).db("blog");
  const postCollection = db.collection("posts");
  const editForm = await req.json();

  // 게시물 작성자 정보
  const { title, subtitles, contents } = editForm; // 게시물 내용

  const saveData = {
    title,
    subtitles: subtitles.split(" "),
    contents,
  };

  // DB에서 게시물 업데이트 시도
  const result = await postCollection.updateOne({ id: Number(postId) }, { $set: { ...saveData } }); // DB에 저장한 결과

  // 업데이트 결과 응답
  if (result) {
    return NextResponse.json({ id: postId }, { status: 200 }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
