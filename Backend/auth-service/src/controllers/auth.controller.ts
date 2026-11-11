import {Request,Response} from "express";
import { registerUser,loginUser } from "../services/auth.service";

export const register= async(req: Request, rest: Response)=>{
    try{
        const {userId,name,email,password,role}= req.body;
        if(!userId || !name || !email || !password){
            return rest.status(400).json({success:false,message:"All fields are required"});
        }
        const newUser= await registerUser({userId,name,email,password,role});
        return rest.status(201).json({success:true, message: "User registered successfully", user:newUser});
    } catch (error) {
        const message= error instanceof Error ? error.message: "Registration failed"
        const statusCode= message==="User with this email already exists" ? 409 : 500;
        return rest.status(statusCode).json({success:false, message});
    }
}

export const login= async(req: Request, rest: Response)=>{
    try{
    const {email,password}= req.body;
    if(!email || !password){
        return rest.status(400).json({success:false, message:"Email and password are required"});
    }
    const result= await loginUser(email,password);
    return rest.status(200).json({success:true, message:"Login successful", user:{userId: result.user.userId, email: result.user.email, role: result.user.role,status: result.user.status}, token:result.token});
}
catch (error) {
    const message= error instanceof Error ? error.message: "Login failed"
    const statusCode= message==="Invalid email or password" ? 401 : message==="User account is inactive" ? 403 : 500;
    return rest.status(statusCode).json({success:false, message});
}
}
