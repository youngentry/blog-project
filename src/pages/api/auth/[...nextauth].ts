import { connectDB } from "@/utils/db/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  pages: {
    newUser: "/auth/new-user",
  },

  providers: [
    GithubProvider({
      clientId: `${process.env.NEXT_PUBLIC_GITHUB_SOCIAL_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_GITHUB_SOCIAL_CLIENT_SECRET}`,
    }),

    CredentialsProvider({
      //1. 로그인페이지로 이동하여 작성할 form을 생성
      name: "credentials",
      credentials: {
        name: {
          label: "테스터 아이디",
          type: "text",
          placeholder: "tester id",
        },
        password: { label: "비밀번호", type: "password", placeholder: "tester password" },
      },

      //2. form을 통해 로그인 요청시 db와 회원정보 대조
      async authorize(credentials) {
        let db = (await connectDB).db("blog");
        let user = await db.collection("user_credentials").findOne({ name: credentials.name });

        // db에 존재하는 email이 아니면 로그인 실패
        if (!user || user.email === "visitor") {
          console.log("존재하지 않는 유저 email");
          return null;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        // 비밀번호가 일치하지 않으면 로그인 실패
        if (!isValidPassword) {
          console.log("일치하지 않는 비밀번호");
          return null;
        }
        return user;
      },
    }),
  ],

  // cookie에 session token을 저장할 때 만료시간 설정
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3일
  },

  callbacks: {
    //4. jwt 생성 시 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token }: { token: Promise<JWT> }) => {
      return token;
    },
    //5. 유저 세션이 조회될 때 session에 user 정보를 저장하여 이용할 수 있도록 함
    session: async ({ session }: { session: Promise<Session> }) => {
      return session;
    },
  },

  secret: `${process.env.NEXTAUTH_SECRET}`,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
