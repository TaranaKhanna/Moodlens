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

    // TEMP DUMMY RESPONSE
    // Later AI integration will come here

    const result = {
      emotion: "Happy",
      confidence: 85,
      emoji: "😊",
    };

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};