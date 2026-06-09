import axios from "axios";

const API_URL =
  "http://localhost:8000/api/history";

export const getHistoryAPI =
  async () => {
    const response = await axios.get(
      API_URL
    );

    return response.data;
  };