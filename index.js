import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AllRoute from "./routes/AllRoute.js";

dotenv.config();

const app = express();
const PORT = 3000;

// 🔓 Izinkan semua origin
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/v1", AllRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
