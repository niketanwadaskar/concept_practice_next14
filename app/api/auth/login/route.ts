// Example users with plain text passwords
const users = [
  {
    id: "1",
    username: "testuser",
    password: "password123", // Plain text password
  },
  {
    id: "2",
    username: "admin",
    password: "password123", // Plain text password
  },
];

// Handle GET requests
export async function GET(req: Request) {
  return new Response(
    JSON.stringify({ message: "This is the login endpoint. Use POST for authentication." }),
    { status: 200 }
  );
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;
  // Basic input validation
  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Username and password are required" }),
      { status: 400 }
    );
  }
  
  // Find the user from your database (or array in this example)
  const user = users.find((user) => user.username === username);
  
  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401 }
    );
  }
  
  // Simple plain-text password comparison
  if (user.password !== password) {
    return new Response(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401 }
    );
  }
  
  // If password matches, return success
  return new Response(
    JSON.stringify({ ...user, message: "Login successful" }),
    { status: 200 }
  );
}
