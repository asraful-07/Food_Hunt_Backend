import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: JwtPayload,
  secret: string,
  { expiresIn }: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return {
      success: true,
      decoded,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "Invalid token",
    };
  }
};

export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  return decoded;
};
