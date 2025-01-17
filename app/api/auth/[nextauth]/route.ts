// app/api/auth/[nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

// Define the NextAuth configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Example logic: Replace with your authentication logic (e.g., check username/password)
        const { username, password } = credentials;

        if (username === 'admin' && password === 'password123') {
          return { id: 1, name: 'Admin User', email: 'admin@example.com' };
        }
        return null;  // Authorization failed
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    }
  }
};

// Named exports for HTTP methods
export async function GET(request: Request) {
  // Handle the GET request, typically for fetching provider data (NextAuth expects this)
  const authResponse = await NextAuth(request, authOptions);
  return NextResponse.json(authResponse);
}

export async function POST(request: Request) {
  // Handle the POST request for authentication (signing in)
  const authResponse = await NextAuth(request, authOptions);
  return NextResponse.json(authResponse);
}
