import dotenv from "dotenv";
import app from "./app";
import connectDatabase from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

startServer();