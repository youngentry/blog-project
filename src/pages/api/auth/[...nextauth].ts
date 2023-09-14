import { connectDB } from "@/utils/db/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.NEXT_PUBLIC_GITHUB_SOCIAL_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_GITHUB_SOCIAL_CLIENT_SECRET}`,
    }),
  ],
  secret: `${process.env.NEXT_PUBLIC_JWT_SECRET}`,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
