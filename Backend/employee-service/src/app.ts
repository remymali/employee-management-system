import express from 'express';
import cors from 'cors';
import employeeRoutes from "./routes/employee.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'employee-service',
    message: 'Employee service is running',
  });
});
app.use("/api/employees", employeeRoutes);
export default app;