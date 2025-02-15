import React from "react";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

async function fetchUsers(): Promise<User[]> {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getAll`;

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Optional: Include a token if required
    },
    cache: "no-store", // Ensures fresh data is fetched on each request
    next: { revalidate: 3600 * 24 * 30}, // Cache for 
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users, status: ${response.status}`);
  }

  return response.json();
}

const UsersPage = async () => {
  let users: User[] = [];

  try {
    users = await fetchUsers();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <div>
      <h1>User List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
