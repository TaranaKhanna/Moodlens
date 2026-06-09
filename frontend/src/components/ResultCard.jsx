import { Loader2, Smile } from "lucide-react";

const ResultCard = ({
  selectedImage,
  loading,
  result,
  error,
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
      <div className="flex flex-col items-center justify-center min-h-[420px] bg-[#0B122B] rounded-3xl border border-white/5 p-6">
        
        {/* EMPTY STATE */}
        {!selectedImage &&
          !loading &&
          !result &&
          !error && (
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
                Upload an image and click
                analyze to detect facial
                emotion.
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

        {/* ERROR STATE */}
        {!loading && error && (
          <>
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <span className="text-5xl">
                ⚠️
              </span>
            </div>

            <h3 className="text-red-400 text-2xl font-semibold mb-3 text-center">
              Analysis Failed
            </h3>

            <p className="text-gray-400 text-center max-w-[320px] leading-relaxed">
              {error}
            </p>
          </>
        )}

        {/* RESULT STATE */}
        {!loading && result && !error && (
          <>
            {/* Emoji */}
            <div className="text-7xl mb-5">
              {result.emoji}
            </div>

            {/* Main Emotion */}
            <h2 className="text-white text-4xl font-bold mb-3 text-center">
              {result.emotion}
            </h2>

            <p className="text-gray-400 mb-6">
              Confidence Score
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-[320px] bg-white/10 h-4 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${result.confidence}%`,
                }}
                className="h-full bg-[#22C55E] rounded-full transition-all duration-700"
              />
            </div>

            {/* Confidence */}
            <span className="text-[#22C55E] text-2xl font-semibold mt-4">
              {result.confidence}%
            </span>

            {/* Emotion Stats */}
            {result.emotions && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 w-full max-w-[500px]">
                {Object.entries(
                  result.emotions
                )
                  .sort(
                    (a, b) => b[1] - a[1]
                  )
                  .slice(0, 6)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white/5 rounded-2xl p-4 text-center border border-white/5"
                    >
                      <p className="text-gray-400 text-sm mb-2 capitalize">
                        {key}
                      </p>

                      <h4 className="text-white text-lg font-semibold">
                        {Math.round(value)}%
                      </h4>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultCard;