import express from "express";

import { uploadImage } from "../middleware/uploadMiddleware.js";

import { analyzeEmotion } from "../controllers/emotionController.js";

const router = express.Router();

router.post(
  "/analyze",
  uploadImage,
  analyzeEmotion
);

export default router;
