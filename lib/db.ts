// lib/db.ts
import { Pool } from 'pg';

// Create a connection pool to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Define types for query results
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

// Query helper function with types
export const query = async (text: string, params?: any[]): Promise<User[]> => {
  const res = await pool.query(text, params);
  return res.rows;
};
