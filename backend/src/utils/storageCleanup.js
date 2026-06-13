import fs from "fs/promises";
import path from "path";
import Analysis from "../models/Analysis.js";

const MAX_SUCCESSFUL_ANALYSES = 12;
const uploadPath = path.resolve("uploads");

const getImagePath = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  return path.join(
    uploadPath,
    path.basename(imageUrl)
  );
};

export const deleteUploadedFile = async (
  filePath
) => {
  if (!filePath) {
    return;
  }

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

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
      .select("_id imageUrl")
      .lean();

    for (const analysis of oldAnalyses) {
      await deleteUploadedFile(
        getImagePath(analysis.imageUrl)
      );

      await Analysis.deleteOne({
        _id: analysis._id,
      });
    }
  };
