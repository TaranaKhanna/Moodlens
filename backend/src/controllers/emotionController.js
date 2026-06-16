import { detectEmotion } from "../services/emotionService.js";
import Analysis from "../models/Analysis.js";
import { createAnalysisError, getAnalysisErrorResponse } from "../utils/analysisErrors.js";
import { pruneOldAnalyses } from "../utils/storageCleanup.js";
import { uploadImageToCloudinary } from "../services/cloudinaryService.js";

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
      req.file
    );

    const uploadedImage =
      await uploadImageToCloudinary(
        req.file
      );

    const emotion = result.emotion;
    const confidence = result.confidence;

    const savedAnalysis =
      await Analysis.create({
        imageUrl: uploadedImage.imageUrl,
        cloudinaryPublicId:
          uploadedImage.cloudinaryPublicId,
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
    const errorResponse =
      getAnalysisErrorResponse(error);

    res
      .status(errorResponse.status)
      .json(errorResponse.body);
  }
};
