import bcrypt from "bcryptjs";
import User,{IUser} from "../models/user.model";
import {generateToken} from "../utils/jwt";

interface RegisterData{
    userId: string;
    name: string;
    email: string;
    password: string;
    role?:"Admin"|"HR"|"Employee"
}

export  const registerUser = async(userData: RegisterData):Promise<IUser>=>{
    const email= userData.email.toLowerCase().trim();
    const existingUser= await User.findOne({email});
    if (existingUser){
        throw new Error("User with this email already exists");
    }
    const existingUserId= await User.findOne({userId:userData.userId});
    if (existingUserId){
        throw new Error("User with this userId already exists");
    }
    const hashedPassword= await bcrypt.hash(userData.password,12);
    const newUser= await User.create({userId:userData.userId,name:userData.name,email:email,password:hashedPassword,role:userData.role,status:"active"});
    return newUser;
}

export  const loginUser= async(email:string ,password:string):Promise<{user: IUser, token: string}>=>{
    const user= await User.findOne({email:email.toLowerCase().trim()});
    if(!user){
        throw new Error("Invalid email or password");
    }
    if(user.status==="inactive"){
        throw new Error("User account is inactive");
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }
    const token= generateToken({userId:user.userId,email:user.email,role:user.role});
    return {user,token};
    }