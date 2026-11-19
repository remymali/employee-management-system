import {Request,Response, NextFunction} from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
    user?:{
        userId: string,
        email:string,
        role:string
    }
}
export const authenticateToken  = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
 const authHeader= req.headers.authorization;
 if(!authHeader || !authHeader.startsWith("Bearer ")){
  return res.status(401).json({message: "Access token required" , success: false}) 
}
const token= authHeader.split(" ")[1];
const decodedToken= verifyToken(token);
req.user= decodedToken;
next();
}catch (error) {
    return res.status(401).json({message :"Invalid or expired token", success: false});
}
}
