import multer from "multer";
import {
  createAnalysisError,
  getAnalysisErrorResponse,
} from "../utils/analysisErrors.js";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
];

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      allowedMimeTypes.includes(file.mimetype)
    ) {
      cb(null, true);
      return;
    }

    const error = createAnalysisError(
      "UNSUPPORTED_IMAGE",
      415
    );

    cb(error);
  },
});

export const uploadImage = (
  req,
  res,
  next
) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (
      error instanceof multer.MulterError &&
      error.code === "LIMIT_FILE_SIZE"
    ) {
      const errorResponse =
        getAnalysisErrorResponse(
          createAnalysisError(
            "UNSUPPORTED_IMAGE",
            413
          )
        );

      return res
        .status(errorResponse.status)
        .json(errorResponse.body);
    }

    const errorResponse =
      getAnalysisErrorResponse(
        error?.isAnalysisError
          ? error
          : createAnalysisError(
              "UNSUPPORTED_IMAGE",
              400
            )
      );

    res
      .status(errorResponse.status)
      .json(errorResponse.body);
  });
};

export default upload;
