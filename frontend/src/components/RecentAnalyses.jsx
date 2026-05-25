import { History } from "lucide-react";

const analyses = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    emotion: "Happy",
    confidence: "94%",
    date: "May 21, 2026",
    color: "bg-yellow-500/20 text-yellow-400",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    emotion: "Calm",
    confidence: "88%",
    date: "May 20, 2026",
    color: "bg-green-500/20 text-green-400",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200",
    emotion: "Surprised",
    confidence: "81%",
    date: "May 19, 2026",
    color: "bg-pink-500/20 text-pink-400",
  },

  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    emotion: "Sad",
    confidence: "76%",
    date: "May 18, 2026",
    color: "bg-blue-500/20 text-blue-400",
  },
];

const RecentAnalyses = () => {
  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8 h-full">
      {/* Header */}
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

        <button className="text-[#5B8CFF] hover:text-white transition-all text-sm">
          View All
        </button>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {analyses.map((item) => (
          <div
            key={item.id}
            className="bg-white/[0.03] border border-white/5 rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.emotion}
                className="w-14 h-14 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}
                  >
                    {item.emotion}
                  </span>

                  <span className="text-white font-semibold">
                    {item.confidence}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-3">
                  {item.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
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
                key={item.id}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-all"
              >
                {/* Image */}
                <td className="py-5">
                  <img
                    src={item.image}
                    alt={item.emotion}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                </td>

                {/* Emotion */}
                <td className="py-5">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${item.color}`}
                  >
                    {item.emotion}
                  </span>
                </td>

                {/* Confidence */}
                <td className="py-5 text-white font-medium">
                  {item.confidence}
                </td>

                {/* Date */}
                <td className="py-5 text-gray-400">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAnalyses;