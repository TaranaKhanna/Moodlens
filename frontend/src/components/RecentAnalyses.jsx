import { useEffect, useState } from "react";
import { History } from "lucide-react";

import { getHistoryAPI } from "../api/historyApi";

const getEmotionColor = (
  emotion
) => {
  switch (
  emotion?.toLowerCase()
  ) {
    case "happiness":
      return "bg-yellow-500/20 text-yellow-400";

    case "sadness":
      return "bg-blue-500/20 text-blue-400";

    case "anger":
      return "bg-red-500/20 text-red-400";

    case "fear":
      return "bg-purple-500/20 text-purple-400";

    case "surprise":
      return "bg-pink-500/20 text-pink-400";

    case "neutral":
      return "bg-green-500/20 text-green-400";

    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getImageSrc = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `http://localhost:8000${imageUrl}`;
};

const RecentAnalyses = () => {
  const [analyses, setAnalyses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory =
    async () => {
      try {
        const data =
          await getHistoryAPI();

        setAnalyses(
          data.analyses || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#5B8CFF]/10 flex items-center justify-center">
            <History className="text-[#5B8CFF]" />
          </div>

          <div>
            <h2 className="text-white text-2xl font-semibold">
              Recent Analyses
            </h2>

            <p className="text-gray-400 text-sm">
              Latest emotion detections
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <p className="text-gray-400">
          Loading analyses...
        </p>
      )}

      {!loading &&
        analyses.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No analyses found.
          </p>
        )}

      {!loading && (
        <div className="flex flex-col gap-4 md:hidden">
          {analyses.map((item) => (
            <div
              key={item._id}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getImageSrc(item.imageUrl)}
                  alt={item.emotion}
                  className="w-14 h-14 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getEmotionColor(
                        item.emotion
                      )}`}
                    >
                      {item.emotion}
                    </span>

                    <span className="text-white font-semibold">
                      {item.confidence}%
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mt-3">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-4 text-gray-400 font-medium">
                  Image
                </th>

                <th className="pb-4 text-gray-400 font-medium">
                  Emotion
                </th>

                <th className="pb-4 text-gray-400 font-medium">
                  Confidence
                </th>

                <th className="pb-4 text-gray-400 font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {analyses.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-all"
                >
                  <td className="py-5">
                    <img
                      src={getImageSrc(item.imageUrl)}
                      alt={item.emotion}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                  </td>

                  <td className="py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getEmotionColor(
                        item.emotion
                      )}`}
                    >
                      {item.emotion}
                    </span>
                  </td>

                  <td className="py-5 text-white font-medium">
                    {item.confidence}%
                  </td>

                  <td className="py-5 text-gray-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentAnalyses;
