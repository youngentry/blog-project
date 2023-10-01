import { CategoryType } from "@/services/categoryFetch";
import { connectDB } from "@/utils/db/db";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
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

// 1. 라우터에서 로그인 유저가 admin인지 확인
//    > 아니라면 '/'으로 보내기

// 2. 요청을 보낸 사람이 admin인지 확인
//    > 아니라면 '/'으로 보내기

// 3. 메인 카테고리 제목 또는 서브 카테고리 제목 body로 받기
//    > {_id:"", role:"main", parent:"", title:"메인타이틀"}
//    or {_id:"", role:"sub", parent:"부모아이디", title:"서브타이틀"}

// 4. role에 따라 저장 방식 분기
//    > role:"main" 인 경우
//      > 데이터 저장 {role:"main", parent:"", title:"메인타이틀", children:[]}
//    > role:"sub" 인 경우
//      > 데이터 저장 {role:"sub", parent:"부모아이디", title:"서브타이틀", children:[]}

// 새로운 카테고리 작성 API 입니다.
export const POST = async (req: NextRequest) => {
  // DB와 Collection 연결
  const db = (await connectDB).db("blog");
  const categoryCollection = db.collection("categories");

  // 권한 검사
  const token = await getToken({ req });

  // 로그인 되지 않은 사용자 경고
  if (!token) {
    return NextResponse.json({ message: "카테고리 편집: 유효하지 않은 접근입니다." }, { status: 400 });
  }

  // admin이 아닌 사용자 경고
  const { email } = token;
  if (!checkBlogAdmin(email as string)) {
    return NextResponse.json({ message: "카테고리 편집: 유효하지 않은 접근입니다." }, { status: 400 });
  }

  const body = await req.json();
  let { _id, role, parent, title }: CategoryType = body; // 게시물 내용

  // 메인 추가/수정
  if (role === "main") {
    _id = _id ? new ObjectId(_id) : "";

    const saveData = {
      _id: new ObjectId(),
      title,
      role,
      children: [],
    };

    // _id가 존재하면 수정
    if (_id) {
      const result = await categoryCollection.updateOne({ _id }, { $set: { title } }, { upsert: true }); // DB에 저장한 결과

      if (result) {
        return NextResponse.json(
          { message: "카테고리 편집: 메인 카테고리 추가 성공." },
          { status: 200 }
        );
      }
    }

    // _id가 존재하지 않으면 추가
    const result = await categoryCollection.insertOne({ ...saveData }); // DB에 저장한 결과

    if (result) {
      return NextResponse.json({ message: "카테고리 편집: 메인 카테고리 추가 성공." }, { status: 200 });
    }
  }

  // 서브 추가
  if (role === "sub") {
    const saveData: CategoryType = {
      _id: new ObjectId(),
      ...body,
    };

    const result = await categoryCollection.findOneAndUpdate(
      { _id: new ObjectId(parent) },
      { $addToSet: { children: { ...saveData } } }
    ); // DB에 저장한 결과

    if (result) {
      return NextResponse.json({ message: "카테고리 편집: 서브 카테고리 추가 성공." }, { status: 200 });
    }
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
