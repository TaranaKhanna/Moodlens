import { detectEmotion } from "../services/emotionService.js";
import Analysis from "../models/Analysis.js";
import {
  createAnalysisError,
  getAnalysisErrorResponse,
} from "../utils/analysisErrors.js";
import {
  deleteUploadedFile,
  pruneOldAnalyses,
} from "../utils/storageCleanup.js";

export const analyzeEmotion = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      const errorResponse =
        getAnalysisErrorResponse(
          createAnalysisError(
            "UNSUPPORTED_IMAGE",
            400
          )
        );

      return res
        .status(errorResponse.status)
        .json(errorResponse.body);
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

    try {
      await pruneOldAnalyses();
    } catch (cleanupError) {
      console.error(
        "Failed to prune old analyses:",
        cleanupError
      );
    }

    res.status(200).json({
      success: true,
      result,
      analysis: savedAnalysis,
    });
  } catch (error) {
    try {
      await deleteUploadedFile(req.file?.path);
    } catch (cleanupError) {
      console.error(
        "Failed to delete failed upload:",
        cleanupError
      );
    }

    const errorResponse =
      getAnalysisErrorResponse(error);

    res
      .status(errorResponse.status)
      .json(errorResponse.body);
  }
};
