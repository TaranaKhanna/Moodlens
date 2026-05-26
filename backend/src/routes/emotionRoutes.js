import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { analyzeEmotion } from "../controllers/emotionController.js";

const router = express.Router();

router.post(
  "/analyze",
  upload.single("image"),
  analyzeEmotion
);

export default router;