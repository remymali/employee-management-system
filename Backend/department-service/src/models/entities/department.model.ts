import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {     
    departmentId: string;
    name: string;
    description?: string;
    status: "Active" | "Inactive";
}

const departmentSchema = new Schema<IDepartment>({
    departmentId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,        
    },

    description: {
        type: String,
        trim: true,
    },

    status: {       
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
},
    {
    timestamps: true,
  }
);

export const Department = mongoose.model<IDepartment>("Department", departmentSchema);  
    