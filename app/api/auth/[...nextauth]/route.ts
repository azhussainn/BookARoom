import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/user";
import bcrypt from "bcryptjs";

type Credentials = {
  email: string,
  password: string,
}

async function auth(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, {
      session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
      },
      providers: [
        CredentialsProvider({

          // @ts-ignore
          async authorize(credentials: Credentials, req) {
            await dbConnect();
            const { email, password } = credentials;
            const user = await User.findOne({ email }).select('+password');
            if(!user){
              throw new Error("Invalid Email or password");
            }

            const passwordMatches = bcrypt.compare(password, user.password);
            if(!passwordMatches){
              throw new Error("Invalid Email or password");
            }

            return user;

          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          if(user){
            token.user = user
          }
          // TODO: update session when user is updated
          return token;
        },
        async session({ session, token}) { 
          session.user = token.user as IUser

          // @ts-ignore
          delete session?.user?.password;
          return session
        }
      },
      secret: process.env.NEXTAUTH_SECRET
    })
}

export { auth as GET, auth as POST };