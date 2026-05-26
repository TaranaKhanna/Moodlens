import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import emotionRoutes from "./routes/emotionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/emotion", emotionRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});