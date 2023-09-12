import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // 구현하고 싶은 로그인 방식을 작성하면 됩니다.
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_SOCIAL_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_SOCIAL_CLIENT_SECRET}`,
    }),
    // Google이면 GoogleProvider 찾아서 붙여넣기 하면 됨
  ],
  secret: `${process.env.JWT_SECRET}`,
};
export default NextAuth(authOptions);
