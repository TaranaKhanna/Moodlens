import { Loader2, Smile } from "lucide-react";

const ResultCard = ({
  selectedImage,
  loading,
  result,
}) => {
  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center">
          <Smile className="text-[#22C55E]" />
        </div>

        <div>
          <h2 className="text-white text-2xl font-semibold">
            Detection Result
          </h2>

          <p className="text-gray-400 text-sm">
            AI-powered emotion analysis
          </p>
        </div>
      </div>

      {/* Result Body */}
      <div className="flex flex-col items-center justify-center h-[420px] bg-[#0B122B] rounded-3xl border border-white/5 p-6">
        {/* EMPTY STATE */}
        {!selectedImage && !loading && !result && (
          <>
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Smile
                size={42}
                className="text-gray-500"
              />
            </div>

            <h3 className="text-white text-2xl font-semibold mb-3 text-center">
              No Analysis Yet
            </h3>

            <p className="text-gray-400 text-center max-w-[300px]">
              Upload an image and click analyze
              to detect facial emotion.
            </p>
          </>
        )}

        {/* LOADING STATE */}
        {loading && (
          <>
            <Loader2
              size={60}
              className="text-[#5B8CFF] animate-spin mb-6"
            />

            <h3 className="text-white text-2xl font-semibold mb-3">
              Analyzing...
            </h3>

            <p className="text-gray-400 text-center">
              AI is processing the image.
            </p>
          </>
        )}

        {/* RESULT STATE */}
        {!loading && result && (
          <>
            {/* Emoji */}
            <div className="text-7xl mb-5">
              {result.emoji}
            </div>

            {/* Emotion */}
            <h2 className="text-white text-4xl font-bold mb-3">
              {result.emotion}
            </h2>

            <p className="text-gray-400 mb-6">
              Confidence Score
            </p>

            {/* Progress */}
            <div className="w-full max-w-[300px] bg-white/10 h-4 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${result.confidence}%`,
                }}
                className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
              />
            </div>

            <span className="text-[#22C55E] text-xl font-semibold mt-4">
              {result.confidence}%
            </span>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 w-full max-w-[400px] px-4">
              <div className="bg-white/5 rounded-2xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">
                  Neutral
                </p>

                <h4 className="text-white font-semibold">
                  10%
                </h4>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">
                  Sad
                </p>

                <h4 className="text-white font-semibold">
                  3%
                </h4>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">
                  Angry
                </p>

                <h4 className="text-white font-semibold">
                  2%
                </h4>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultCard;