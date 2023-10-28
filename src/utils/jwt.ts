import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (payload: Object, options: SignOptions) => {
  const privateKey = process.env.JWT_TOKEN;
  if (privateKey) {
    return jwt.sign(payload, privateKey, {
      ...(options && options),
      // algorithm: "RS256",
    });
  }
};

export const verifyJwt = <T>(token: string): T | null | undefined => {
  try {
    const publicKey = process.env.JWT_TOKEN;
    if (publicKey) {
      const decoded = jwt.verify(token, publicKey) as T;

      return decoded;
    }
  } catch (error) {
    return null;
  }
};
