//src/server/auth.ts

import { getServerSession, type NextAuthOptions } from "next-auth";
// import Credentials from "node_modules/next-auth/providers/credentials";
import { userService } from "./services/userService";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.type === "credentials") {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("testtest3");
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        return userService.authenticate(username, password); //(5)
      },
    }),
  ],
};

// export const getServerAuthSession = () => getServerSession(authOptions); //(6)
//  authOptions;/
