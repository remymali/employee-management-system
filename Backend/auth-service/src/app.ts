import express   from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'auth-service',
        message: 'Auth service is running',
    });
});
export default app