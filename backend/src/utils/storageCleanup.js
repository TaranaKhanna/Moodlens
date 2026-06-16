import Analysis from "../models/Analysis.js";
import {
  deleteCloudinaryImage,
} from "../services/cloudinaryService.js";

const MAX_SUCCESSFUL_ANALYSES = 12;

export const pruneOldAnalyses =
  async () => {
    const analysisCount =
      await Analysis.countDocuments();

    if (
      analysisCount <= MAX_SUCCESSFUL_ANALYSES
    ) {
      return;
    }

    const oldAnalyses = await Analysis.find()
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .skip(MAX_SUCCESSFUL_ANALYSES)
      .select("_id cloudinaryPublicId")
      .lean();

    for (const analysis of oldAnalyses) {
      await deleteCloudinaryImage(
        analysis.cloudinaryPublicId
      );

      await Analysis.deleteOne({
        _id: analysis._id,
      });
    }
  };
