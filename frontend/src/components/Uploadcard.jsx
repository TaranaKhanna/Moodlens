import { useRef, useState } from "react";
import { analyzeEmotionAPI } from "../api/emotionApi";

import {
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

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validation
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg"
    ) {
      alert("Only PNG and JPG files allowed");
      return;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setSelectedImage(file);
  };

  // Remove Image
  // const removeImage = () => {
  //   setSelectedImage(null);
  // };
  const removeImage = () => {
    setSelectedImage(null);

    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // backend call
  const handleAnalyze = async () => {
    if (!selectedImage) return;

    try {
      setLoading(true);

      const data =
        await analyzeEmotionAPI(
          selectedImage
        );

      setResult(data.result);
    } catch (error) {
      console.log(error);

      setResult(null);

      setError(
        error.response?.data?.message ||
        "Emotion detection failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8">
      {/* Header */}
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

      {/* Upload Area */}
      <div className="border-2 border-dashed border-white/10 rounded-3xl p-6 md:p-8 bg-[#0B122B]">
        {!selectedImage ? (
          <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
            {/* Icon */}
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

            {/* Hidden Input */}
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Upload Button */}
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
            {/* Remove Button */}
            <button
              onClick={removeImage}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-all"
            >
              <X size={18} />
            </button>

            {/* Preview */}
            <img
              src={URL.createObjectURL(
                selectedImage
              )}
              alt="Preview"
              className="w-full h-[320px] object-cover rounded-2xl"
            />

            {/* File Name */}
            <p className="text-gray-400 text-sm mt-4 truncate">
              {selectedImage.name}
            </p>
          </div>
        )}
      </div>

      {/* Analyze Button */}
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