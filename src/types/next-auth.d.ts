import NextAuth from 'next-auth';

declare module 'next-atuh' {
  interface JWT {
    name: string;
    email: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    role?: string;
  }
}
