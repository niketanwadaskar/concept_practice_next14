import { query } from "@/lib/db";

// get all users fromm db
export async function GET(req: Request) {
  const users = await query("SELECT * FROM users;");
  return new Response(JSON.stringify(users))
}