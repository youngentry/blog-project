import { connectDB } from "@/utils/db/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 새로운 게시물 작성 API 입니다.
export const POST = async (req: NextRequest) => {
  // DB와 Collection 연결
  const db = (await connectDB).db("blog");
  const postCollection = db.collection("posts");
  const countersCollection = db.collection("counters");

  // 게시물 작성자 정보
  const token = await getToken({ req });
  const data = await req.json();

  // 게시물 번호 정보 업데이트하기
  const currentCounter = await countersCollection.findOne({ model: "posts" });
  await countersCollection.findOneAndUpdate(
    { model: "posts" },
    { $inc: { number: 1, postCount: 1 } },
    { upsert: true }
  );

  const { title, subtitle, contents, categoryId, src } = data; // 게시물 내용
  const id = currentCounter ? currentCounter.number + 1 : 1; // 게시물 번호
  const email = token?.email; // 작성자 email
  const author = token?.name; // 작성자 닉네임
  const date = new Date(); // 게시물 작성 시점
  const commentCount = 0; // 댓글
  const likes = 0; // 좋아요

  const saveData = {
    id,
    title,
    subtitle,
    contents,
    email,
    categoryId,
    src: src || "https://cdn.pixabay.com/photo/2023/09/03/11/13/mountains-8230502_1280.jpg",
    author,
    date,
    commentCount,
    likes,
  };

  const result = await postCollection.insertOne({ ...saveData }); // DB에 저장한 결과

  if (result) {
    return NextResponse.json({ id }, { status: 200 });
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
