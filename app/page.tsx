"use client";

import UserInfo from "@/components/UserInfo"; // Import UserInfo component
import { Session } from "next-auth";
import { getSession } from "next-auth/react"; // Import the hook to get session data
import Link from "next/link"; // Import Link for navigation
import { useEffect, useState } from "react";

export default function HomePage() {
  const [session, setSession] = useState<Session | null>();

  async function fun() {
    const session = await getSession(); // Using the `useSession` hook
    setSession(session);
  }

  useEffect(() => {
    fun();
  }, []);
  // if (status === "loading") {
  //   return <p>Loading...</p>; // Optionally show loading state while the session is being fetched
  // }

  return (
    <main className="flex items-center justify-center h-screen">
      {/* Check if session exists and render UserInfo */}
      {session ? (
        <UserInfo user={session.user} />
      ) : (
        <Link
          className="font-medium mt-2 text-blue-600 hover:underline"
          href="/login"
        >
          Login
        </Link>
      )}
    </main>
  );
}
