import axios from "axios";

const API_URL = "http://localhost:8000/api/emotion";

export const analyzeEmotionAPI = async ( imageFile ) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await axios.post(
    `${API_URL}/analyze`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};