import express from "express";
import cors from "cors";
import departmentRoutes from "./routes/department.routes";  

const app = express();

app.use(cors());
app.use(express.json());    

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'department-service',
        message: 'Department service is running',
    });
});
app.use("/api/departments", departmentRoutes);
export default app; 
