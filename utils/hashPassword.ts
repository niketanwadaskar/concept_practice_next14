import bcrypt from "bcryptjs";

export async function hashPassword(val: string): Promise<string> {
  if (!val || typeof val !== "string") {
    throw new Error("Password must be a non-empty string.");
  }

  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(val, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}
