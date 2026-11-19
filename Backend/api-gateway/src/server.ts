import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolve } from "node:path";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();

// const PORT = process.env.PORT || 4000;
const PORT = Number(process.env.PORT) || 4000;

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

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/auth${path}`,
  })
);
// app.listen(PORT, () => {
//   console.log(`API Gateway running on port ${PORT}`);
// });
const server = app.listen(Number(PORT), "127.0.0.1", () => {
  const address = server.address();

  console.log("API Gateway started successfully");
  console.log("Listening address:", address);
});

server.on("error", (error) => {
  console.error("API Gateway startup error:", error);
});