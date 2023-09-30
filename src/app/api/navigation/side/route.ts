import { connectDB } from "@/utils/db/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// 카테고리 정보를 불러오는 API입니다.
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const role: string | null = searchParams.get("role"); // DB에서 댓글 찾고 수정하기 위한 _id
  const parentId: string | null = searchParams.get("parentId"); // DB에서 댓글 찾고 수정하기 위한 _id

  const db = (await connectDB).db("blog");
  const categoryCollection = db.collection("categories");

  if (role === "main") {
    const foundCategory = await categoryCollection.find({ role }).toArray();

    //   해당 카테고리 데이터와 status를 응답합니다.
    if (foundCategory) {
      return NextResponse.json(foundCategory, { status: 200 });
    }
  }

  if (role === "sub") {
    const foundCategory = await categoryCollection.findOne({ _id: new ObjectId(parentId as string) });

    //   해당 카테고리 데이터와 status를 응답합니다.
    if (foundCategory) {
      return NextResponse.json(foundCategory, { status: 200 });
    }
  }

  if (!role) {
    const foundCategory = await categoryCollection.find({}).toArray();

    //   모든 카테고리 데이터와 status를 응답합니다.
    if (foundCategory) {
      return NextResponse.json(foundCategory, { status: 200 });
    }
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
