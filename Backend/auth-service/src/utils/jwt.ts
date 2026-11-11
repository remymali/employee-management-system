import jwt from "jsonwebtoken";

interface tokenPayload{
    userId: string,
    email: string,
    role: string
}

export const generateToken= (payload: tokenPayload): string=>{
const secretKey= process.env.JWT_SECRET;
if(!secretKey){
    throw new Error("JWT_SECRET is not defined in environment variables");
}
return jwt.sign(payload,secretKey,{expiresIn:"1d"});
}

export const verifyToken= (token: string): tokenPayload=>{
const secretKey= process.env.JWT_SECRET;
if(!secretKey){
    throw new Error("JWT_SECRET is not defined in environment variables");
}
return jwt.verify(token,secretKey) as tokenPayload;
}