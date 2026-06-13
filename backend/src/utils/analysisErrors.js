export const ANALYSIS_ERROR_MESSAGES = {
  NO_FACE:
    "Unable to detect a face. Please upload a clear photo containing a visible human face.",
  MULTIPLE_FACES:
    "Multiple faces detected. Please upload an image containing only one person.",
  UNSUPPORTED_IMAGE:
    "This image could not be processed. Please try another clear photo.",
  ANALYSIS_FAILED:
    "Something went wrong while analyzing the image. Please try again.",
};

export const createAnalysisError = (
  errorCode,
  statusCode = 422
) => {
  const error = new Error(
    ANALYSIS_ERROR_MESSAGES[errorCode] ||
      ANALYSIS_ERROR_MESSAGES.ANALYSIS_FAILED
  );

  error.errorCode =
    ANALYSIS_ERROR_MESSAGES[errorCode]
      ? errorCode
      : "ANALYSIS_FAILED";
  error.statusCode = statusCode;
  error.isAnalysisError = true;

  return error;
};

export const getAnalysisErrorResponse = (
  error
) => {
  const errorCode = error?.isAnalysisError
    ? error.errorCode
    : "ANALYSIS_FAILED";

  return {
    status: error?.statusCode || 422,
    body: {
      success: false,
      errorCode,
      message:
        ANALYSIS_ERROR_MESSAGES[errorCode] ||
        ANALYSIS_ERROR_MESSAGES.ANALYSIS_FAILED,
    },
  };
};
