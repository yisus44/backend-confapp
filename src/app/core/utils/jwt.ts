import jwt from "jsonwebtoken";

export function generateJWT(payload: any) {
  const secretKey = process.env.SECRET;
  const token = jwt.sign({ payload }, secretKey, { expiresIn: "3d" });
  return token;
}

export function validateJWT(token: string) {
  try {
    const secretKey = process.env.SECRET;
    const isMatch = jwt.verify(token, secretKey);
    return isMatch;
  } catch (error) {
    return false;
  }
}
