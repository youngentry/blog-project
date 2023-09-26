import { Card, Post } from "@/types/post";
import { connectDB } from "@/utils/db/db";
import { NextResponse } from "next/server";

// 게시물 정보를 불러오는 API입니다.
export const GET = async (req: any, res: any) => {
  const db = (await connectDB).db("blog");
  const postCollection = db.collection<Post>("posts");

  // card에 불필요한 데이터는 제외합니다.
  const cardsData: Card[] = await postCollection
    .find({}, { projection: { email: 0, content: 0, _id: 0 } })
    .toArray();

  if (cardsData) {
    return NextResponse.json(cardsData, { status: 200 });
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
