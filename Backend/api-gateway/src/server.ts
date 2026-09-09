import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    message: "API Gateway is running",
  });
});

app.use(
  "/api/employees",
  createProxyMiddleware({
    target: process.env.EMPLOYEE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/employees${path}`,
  })
);

app.use(
  "/api/departments",
  createProxyMiddleware({
    target: process.env.DEPARTMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/departments${path}`,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});