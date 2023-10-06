import { Post } from "@/types/post";
import { connectDB } from "@/utils/db/db";
import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 게시물 좋아요 API 입니다.
export const PATCH = async (req: NextRequest, { params }: Params) => {
  const token: JWT | null = await getToken({ req }); // 유저 정보
  const { postId } = params; // 게시물 번호

  // 로그인 유저를 검사합니다.
  if (!token) {
    return NextResponse.json({ message: "게시물 좋아요: 로그인 된 유저가 아닙니다." }, { status: 400 });
  }

  // 이메일 인증된 유저가 아니면 좋아요를 할 수 없습니다. 에러 반환
  if (!token.email) {
    return NextResponse.json(
      { message: "게시물 좋아요: 이메일이 인증 된 유저가 아닙니다." },
      { status: 400 }
    );
  }

  try {
    // 좋아요 업데이트
    const db = (await connectDB).db("blog");
    const postsCollection = db.collection<Post>("posts");
    const foundPostResult: Post | null = await postsCollection.findOne({ id: Number(postId) });

    // 게시물이 존재하지 않으면 에러 반환
    if (!foundPostResult) {
      return NextResponse.json(
        { message: "게시물 좋아요: 게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const postLikeUsers: string[] = foundPostResult?.likes; // 게시물에 좋아요를 한 유저들의 email 배열입니다.
    let count: number = postLikeUsers.length; // 좋아요 숫자

    // 좋아요를 이미 눌렀다면 배열에서 유저 email 제외
    if (postLikeUsers?.includes(token.email)) {
      await postsCollection.updateOne({ id: Number(postId) }, { $pull: { likes: token.email } });
      count--;
    } else {
      // 그렇지 않다면 배열에 유저 email 추가
      await postsCollection.updateOne({ id: Number(postId) }, { $push: { likes: token.email } });
      count++;
    }
    return NextResponse.json({ count }, { status: 200 }); // 응답에 게시물 id를 포함하여 redirect할 수 있도록 합니다.
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
