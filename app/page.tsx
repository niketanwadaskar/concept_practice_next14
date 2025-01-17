
// import UserInfo from "@/components/UserInfo";
import UserInfo from "@/components/UserInfo";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function HomePage() {
  const authSession =  getServerSession();

  return (  
  <main className="flex items-center justify-center h-screen">
    {authSession?.user && <UserInfo user={authSession?.user} />} //(2) 
    {!authSession?.user && ( //(3) 
      <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">
        Login
      </Link>
    )}
  </main>
  );
}