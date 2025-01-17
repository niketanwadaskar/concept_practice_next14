import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";

interface JWT {
  id: string;
  name: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Define the NextAuth configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        // Example logic: Replace with your authentication logic (e.g., check username/password)
        const { username, password } = credentials;
        if (username === "admin" && password === "password123") {
          return { id: "1", name: "Admin User", email: "admin@example.com" };
        }
        return null; // Authorization failed
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token: JWT, user }: { token: JWT; user: User }) {
      if (user) {
        JWT.id = user.id;
        JWT.name = user.name;
        JWT.email = user.email;
      }
      return JWT;
    },

    async session({ session, token: JWT }: { session: Session; token: JWT }) {
      session.user.id = JWT.id;
      session.user.name = JWT.name;
      session.user.email = JWT.email;
      return session;
    },
  },
};

//@ts-ignore
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
