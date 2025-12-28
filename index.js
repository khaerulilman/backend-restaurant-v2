import express from "express";
import dotenv from "dotenv";
import AllRoute from "./routes/AllRoute.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Semua route di sini
app.use("/api/v1", AllRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
