import { query } from "@/lib/db";
import { hashPassword } from "@/utils/hashPassword";

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: any) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed." }), {
      status: 405,
    });
  }

  try {
    const { name, email, password } = await (req.json() as {
      name: string;
      email: string;
      password: string;
    });

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Name, email, and password are required." }),
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    // Check if email exists
    const existingUser = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ message: "Email already exists." }),
        { status: 400 }
      );
    }

    // Insert into DB
    const result = await query(
      "INSERT INTO users (id, name, email, password,age) VALUES ( uuid_generate_v4(), $1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, 24]
    );
    const newUser = result[0];

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

export { handler as POST };
