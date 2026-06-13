import { detectEmotion } from "../services/emotionService.js";
import Analysis from "../models/Analysis.js";

export const analyzeEmotion = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await detectEmotion(
      req.file.path
    );

    const emotion = result.emotion;
    const confidence = result.confidence;

    const savedAnalysis =
      await Analysis.create({
        imageUrl: `/uploads/${req.file.filename}`,
        emotion,
        confidence,
        emotions: result.emotions,
      });

    res.status(200).json({
      success: true,
      result,
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Emotion detection failed",
    });
  }
};