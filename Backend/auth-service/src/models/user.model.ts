import mongoose, {Document, Schema} from "mongoose";
export type Role= 'Admin' | 'Employee' | 'HR';
export type Status= 'active' | 'inactive';
export interface IUser extends Document{
userId:string
name:string
email:string
password:string
role:Role
status:Status
}
const userSchema = new Schema<IUser>({
userId:{
    type: String,
    required: true,
    unique:true,
    trim: true,
},
name:{
    type: String,
    required: true,
    trim:true,
},
email:{
    type: String,
    required: true,
    trim:true,
    unique:true,
    lowercase: true,
},
password:{
    type: String,
    required:true,
    minlength:6,
},
role:{
    type: String,
    enum: ['Admin', 'HR','Employee'],
    default: "Employee"
},
status:{
type: String,
enum: ['active', 'inactive'],
default: "active"
},
},
{
timestamps: true
}
)

const User = mongoose.model<IUser>('User',userSchema)

export default User;