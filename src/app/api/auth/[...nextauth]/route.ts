import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { JWT } from 'next-auth/jwt';

import { connectDB } from '@/utils/db/db';
import { CustomJWT, CustomSession, CustomUser } from '@/types/session';

const githubSocial =
  process.env.NODE_ENV === 'development'
    ? {
        clientId: process.env.GITHUB_SOCIAL_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_SOCIAL_CLIENT_SECRET as string,
      }
    : {
        clientId: process.env.GITHUB_SOCIAL_CLIENT_ID_DEPLOYMENT as string,
        clientSecret: process.env.GITHUB_SOCIAL_CLIENT_SECRET_DEPLOYMENT as string,
      };

// next-auth 로그인 설정입니다.
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: githubSocial.clientId,
      clientSecret: githubSocial.clientSecret,
      profile(profile) {
        const { id, name, email, avatar_url, login } = profile;
        return { id, name, email, avatar_url, login, role: 'tester', created_at: new Date() };
      },
    }),

    CredentialsProvider({
      // 1. 로그인페이지로 이동하여 작성할 form을 생성
      name: 'credentials',
      credentials: {
        name: {
          label: '테스터 아이디',
          type: 'text',
          placeholder: 'tester id',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: 'tester password',
        },
      },

      // 2. form을 통해 로그인 요청시 db와 회원정보 대조
      async authorize(credentials) {
        const db = (await connectDB).db('blog');
        const user = await db.collection('user_credentials').findOne({ name: credentials?.name });

        // db에 존재하는 email이 아니면 로그인 실패
        if (!user || user.email === 'visitor') {
          return null;
        }

        const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
        // 비밀번호가 일치하지 않으면 로그인 실패
        if (!isValidPassword) {
          return null;
        }
        return user as any;
      },
    }),
  ],

  // cookie에 session token을 저장할 때 만료시간 설정
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60, // 3일
  },

  callbacks: {
    // 4. jwt 생성 시 실행되는 코드
    jwt: ({ token, user }: { token: JWT; user: CustomUser }) => {
      if (user) {
        token.role = user.role;
        token.login = user.login;
      }
      return token;
    },
    // 5. 유저 세션이 조회될 때 session에 user 정보를 저장하여 이용할 수 있도록 함
    session: ({ session, token }: { session: CustomSession; token: CustomJWT }) => {
      if (session?.user) {
        // session에 정보 추가
        session.user.role = token.role;
        session.user.name = session.user.name || token.login;

        return session;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};

const handler = NextAuth({ ...authOptions });

export { handler as GET, handler as POST };
