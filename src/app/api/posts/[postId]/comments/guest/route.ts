import { connectDB } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";
import { Comment, Post } from "@/types/post";
import { compare } from "bcrypt";
import { ObjectId } from "mongodb";

// 게스트 댓글 삭제 API 입니다.
export const POST = async (req: NextRequest, { params }: Params) => {
  const { postId } = params;

  const data = await req.json();
  const { password } = data; // 입력 받은 삭제 확인 password

  const { searchParams } = new URL(req.url);
  const _id: string | null = searchParams.get("_id"); // 삭제할 댓글 id

  if (!_id) {
    return NextResponse.json(
      { message: "게스트 댓글 삭제: 댓글 조회에 실패하였습니다." },
      { status: 400 }
    );
  }

  // DB에 연결합니다.
  const db = (await connectDB).db("blog");
  const commentsCollection = db.collection<Comment>("comments");
  const foundComment = await commentsCollection.findOne({ _id: new ObjectId(_id) }); // DB에서 조회한 댓글

  // 찾는 댓글이 DB에 존재하지 않을 경우
  if (!foundComment) {
    return NextResponse.json(
      { message: "게스트 댓글 삭제: 댓글을 조회할 수  없습니다." },
      { status: 400 }
    );
  }

  const isValidPassword = await compare(password, foundComment.password); // 댓글 비밀번호 검사

  // 입력한 비밀번호가 다른 경우
  if (!isValidPassword) {
    return NextResponse.json({ message: "게스트 댓글 삭제: 비밀번호가 다릅니다." }, { status: 400 });
  }

  // DB에서 댓글 삭제
  const deleteResult = await commentsCollection.deleteOne({ _id: new ObjectId(_id) });

  // 게시물 댓글 갯수 정보 업데이트
  const postsCollection = db.collection<Post>("posts");
  const commentCountUpdateResult = await postsCollection.findOneAndUpdate(
    { id: Number(postId) },
    { $inc: { commentCount: -1 } }
  );

  console.log(commentCountUpdateResult);

  if (deleteResult && commentCountUpdateResult) {
    return NextResponse.json({ message: "댓글 삭제 완료." }, { status: 200 });
  }
  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
};
