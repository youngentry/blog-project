import { Card, Post } from "@/types/post";
import { connectDB } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

// 게시물 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const db = (await connectDB).db("blog");
  const postCollection = db.collection<Post>("posts");

  // card에 불필요한 데이터는 제외합니다.
  const cardsData: Card[] = await postCollection.find({}).toArray();

  // subtitle 정보를 배열로 전달합니다.
  const subtitleData: string[] = cardsData.map((eachCard) => eachCard.subtitle);

  if (subtitleData) {
    return NextResponse.json(subtitleData, { status: 200 });
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
