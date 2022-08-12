import bcrypt from "bcrypt";
const SALT_ROUNDS = process.env.SALT;

async function generateHash(plainText: string): Promise<string> {
  if (!plainText) return;
  const salt = parseInt(SALT_ROUNDS);
  return await bcrypt.hash(plainText, salt);
}

async function compareHash(plainText: string, hash: any): Promise<boolean> {
  if (!plainText || !hash) return;
  return await bcrypt.compare(plainText, hash);
}

export { generateHash, compareHash };
