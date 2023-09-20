import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isBlogManager } from "./utils/sessionCheck/isBlogManager";
export { withAuth } from "next-auth/middleware";

// '/manage' 경로에 접근하는 클라이언트의 권한을 확인합니다.
// 권한이 없다면 '/'로 되돌려 보냅니다.
export const middleware = async (request: NextRequest) => {
  // 1. '/manage'로 시작하는 경로에 접근 시
  if (request.nextUrl.pathname.startsWith("/manage")) {
    // 2. 토큰 정보 가져오기
    const token = await getToken({ req: request });

    // 3. token을 검사하여 접근해도 되는지 확인
    if (token === null || !isBlogManager(token.email as string)) {
      // 4. 접근 불가하면 '/'로 redirect
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/manage/:path*",
};
