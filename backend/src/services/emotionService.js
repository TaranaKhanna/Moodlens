import axios from "axios";
import FormData from "form-data";
import {
  createAnalysisError,
} from "../utils/analysisErrors.js";

const emotionEmojiMap = {
  happiness: "😊",
  sadness: "😢",
  anger: "😠",
  surprise: "😲",
  neutral: "😐",
  fear: "😨",
  disgust: "🤢",
};

const classifyFaceApiError = (error) => {
  if (error?.isAnalysisError) {
    return error;
  }

  const status = error.response?.status;
  const providerMessage =
    error.response?.data?.error_message ||
    error.response?.data?.message ||
    "";
  const normalizedMessage =
    providerMessage.toLowerCase();

  if (
    status === 413 ||
    normalizedMessage.includes(
      "invalid_image_size"
    ) ||
    normalizedMessage.includes(
      "image_error_unsupported_format"
    ) ||
    normalizedMessage.includes(
      "image_file_too_large"
    ) ||
    normalizedMessage.includes("too large") ||
    normalizedMessage.includes(
      "unsupported"
    ) ||
    normalizedMessage.includes(
      "image size"
    )
  ) {
    return createAnalysisError(
      "UNSUPPORTED_IMAGE",
      422
    );
  }

  if (
    status === 400 ||
    normalizedMessage.includes(
      "invalid image"
    ) ||
    normalizedMessage.includes(
      "bad image"
    ) ||
    normalizedMessage.includes(
      "image_error"
    )
  ) {
    return createAnalysisError(
      "NO_FACE",
      422
    );
  }

  return createAnalysisError(
    "ANALYSIS_FAILED",
    422
  );
};

export const detectEmotion = async (
  file
) => {
  try {
    const formData = new FormData();

    formData.append(
      "api_key",
      process.env.FACE_API_KEY
    );

    formData.append(
      "api_secret",
      process.env.FACE_API_SECRET
    );

    formData.append(
      "return_attributes",
      "emotion"
    );

    formData.append(
      "image_file",
      file.buffer,
      {
        filename: file.originalname,
        contentType: file.mimetype,
      }
    );

    const response = await axios.post(
      "https://api-us.faceplusplus.com/facepp/v3/detect",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    if (
      !response.data.faces ||
      response.data.faces.length === 0
    ) {
      throw createAnalysisError(
        "NO_FACE",
        422
      );
    }

    if (response.data.faces.length > 1) {
      throw createAnalysisError(
        "MULTIPLE_FACES",
        422
      );
    }

    const emotions =
      response.data.faces[0].attributes
        .emotion;

    const topEmotion = Object.entries(
      emotions
    ).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );

    return {
      emotion:
        topEmotion[0]
          .charAt(0)
          .toUpperCase() +
        topEmotion[0].slice(1),

      confidence: Math.round(
        topEmotion[1]
      ),

      emoji:
        emotionEmojiMap[topEmotion[0]] ||
        "🙂",

      emotions,
    };
  } catch (error) {
    throw classifyFaceApiError(error);
  }
};
