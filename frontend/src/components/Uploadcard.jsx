import { useRef, useState } from "react";
import { analyzeEmotionAPI } from "../api/emotionApi";

import {
  AlertCircle,
  UploadCloud,
  ImageIcon,
  X,
} from "lucide-react";

const UploadCard = ({
  selectedImage,
  setSelectedImage,
  loading,
  setLoading,
  setResult,
  setError
}) => {

  const fileInputRef = useRef();
  const analyzeRequestRef = useRef(0);
  const [uploadError, setUploadError] =
    useState("");

  const getAnalyzeErrorMessage = (error) => {
    const apiMessage =
      error.response?.data?.message;

    if (apiMessage) {
      return apiMessage;
    }

    if (!error.response) {
      return "Could not connect to the analysis server. Please make sure the backend is running.";
    }

    return "Something went wrong while analyzing the image. Please try again.";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploadError("");
    setError("");
    setResult(null);
    
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg"
    ) {
      setUploadError(
        "This file type is not supported. Please choose a PNG or JPG image."
      );
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(
        "This image is larger than 10MB. Please choose a smaller image."
      );
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
  };

  const removeImage = () => {
    analyzeRequestRef.current += 1;
    setSelectedImage(null);

    setResult(null);
    setError("");
    setLoading(false);
    setUploadError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    const requestId =
      analyzeRequestRef.current + 1;
    analyzeRequestRef.current = requestId;

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data =
        await analyzeEmotionAPI(
          selectedImage
        );

      if (
        requestId !==
        analyzeRequestRef.current
      ) {
        return;
      }

      setResult(data.result);
    } catch (error) {
      if (
        requestId !==
        analyzeRequestRef.current
      ) {
        return;
      }

      setResult(null);

      setError(
        getAnalyzeErrorMessage(error)
      );
    } finally {
      if (
        requestId ===
        analyzeRequestRef.current
      ) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-[#5B8CFF]/20 flex items-center justify-center">
          <UploadCloud className="text-[#5B8CFF]" />
        </div>

        <div>
          <h2 className="text-white text-2xl font-semibold">
            Upload Image
          </h2>

          <p className="text-gray-400 text-sm">
            Analyze facial emotions using AI
          </p>
        </div>
      </div>

      <div className="border-2 border-dashed border-white/10 rounded-3xl p-6 md:p-8 bg-[#0B122B]">
        {!selectedImage ? (
          <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
            <div className="w-20 h-20 rounded-full bg-[#5B8CFF]/10 flex items-center justify-center mb-5">
              <ImageIcon
                size={34}
                className="text-[#5B8CFF]"
              />
            </div>

            <h3 className="text-white text-xl font-medium mb-2">
              Drop your image here
            </h3>

            <p className="text-gray-400 mb-6 text-sm md:text-base">
              PNG, JPG up to 10MB
            </p>

            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            <button
              onClick={() =>
                fileInputRef.current.click()
              }
              className="bg-[#5B8CFF] hover:bg-[#79A2FF] transition-all text-black font-semibold px-6 py-3 rounded-2xl"
            >
              Choose File
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={removeImage}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-all"
            >
              <X size={18} />
            </button>

            <img
              src={URL.createObjectURL(
                selectedImage
              )}
              alt="Preview"
              className="w-full h-[320px] object-cover rounded-2xl"
            />

            <p className="text-gray-400 text-sm mt-4 truncate">
              {selectedImage.name}
            </p>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-amber-300"
          />

          <p className="text-sm leading-relaxed text-amber-100">
            {uploadError}
          </p>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!selectedImage || loading}
        className={`mt-6 w-full py-4 rounded-2xl font-medium transition-all ${selectedImage
          ? "bg-[#5B8CFF] hover:bg-[#79A2FF] text-black"
          : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
      >
        {selectedImage
          ? "Analyze Emotion"
          : "Upload an Image First"}
      </button>
    </div>
  );
};

export default UploadCard;
