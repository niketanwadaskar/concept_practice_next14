import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";
import axios from "axios"; // Make sure to install axios (or use fetch)
import jwt from "jsonwebtoken";

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

        const { username, password } = credentials;
        try {
          // Send a POST request to your login API
          const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            { username, password }
          );
          // If login is successful, return the user object
          if (response.status === 200) {
            const { id, username } = response.data;
            // Assuming you want to decode the token to get user info (optional, depending on your response structure)
            // const decodedToken = jwt.decode(token); // You may need to import jwt.decode or use a library for decoding
            // if(!decodedToken){return null}
            return {
              id: id,
              name: username,
              email: username + "@example.com", // Update this as per your response structure
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during login:", error);
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

// @ts-ignore
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
