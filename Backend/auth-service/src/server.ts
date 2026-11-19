import dotenv from "dotenv";
import app from "./app";
import connectDatabase from "./config/database";

dotenv.config();

// console.log(
//   "JWT_SECRET loaded:",
//   Boolean(process.env.JWT_SECRET)
// );
const PORT = process.env.PORT || 5003;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

startServer();