import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  console.log(request, "i am error re 💭💭💭");
  const error = url.searchParams.get("error");
  // failed auth redirect to login page again
  if(error){
    redirect("/login",200)
  }

  return NextResponse.json({ error });
}
