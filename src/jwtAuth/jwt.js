import { SignJWT } from "jose";
import dotenv from "dotenv";

dotenv.config();

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateAccessToken({ id, email, userType }) {
  return await new SignJWT({ id, email, userType })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(id)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}
