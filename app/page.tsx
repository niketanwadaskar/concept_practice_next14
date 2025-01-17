'use client'

import UserInfo from "@/components/UserInfo";  // Import UserInfo component
import { useSession } from "next-auth/react";  // Import the hook to get session data
import Link from "next/link";  // Import Link for navigation

export default function HomePage() {
  const { data: session, status } = useSession();  // Using the `useSession` hook

  if (status === "loading") {
    return <p>Loading...</p>;  // Optionally show loading state while the session is being fetched
  }

  return (  
    <main className="flex items-center justify-center h-screen">
      {/* Check if session exists and render UserInfo */}
      {session ? (
        <UserInfo user={session.user} /> 
      ) : (
        <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">
          Login
        </Link>
      )}
    </main>
  );
}
