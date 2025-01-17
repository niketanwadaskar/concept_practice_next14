// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
// import { query } from '../../../lib/db';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password }: RegisterRequestBody = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Check if the email already exists
      const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Email already in use.' });
      }

      // Insert the new user into the database
      const result = await query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );

      const newUser = result[0];
      return res.status(201).json({
        message: 'User created',
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
