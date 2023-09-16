import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request });

  if (request.nextUrl.pathname.startsWith("/manage")) {
    if (token === null) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/manage/:path*",
};
