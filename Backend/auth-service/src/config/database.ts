import mongoose from    "mongoose";

const connectDatabase = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGODB_URI;   

        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(mongoUri);

        console.log("Auth MongoDB connected successfully");


    } catch (error) {
        console.error("Auth MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDatabase