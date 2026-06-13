import {
  Bot,
  Heart,
  Info,
  Library,
  ScanFace,
  UploadCloud,
  Zap,
} from "lucide-react";

const steps = [
  {
    label: "Upload",
    icon: UploadCloud,
  },
  {
    label: "Analyze",
    icon: Bot,
  },
  {
    label: "Detect",
    icon: ScanFace,
  },
  {
    label: "Save History",
    icon: Library,
  },
];

const About = () => {
  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-[#5B8CFF]/20 flex items-center justify-center">
          <Info className="text-[#5B8CFF]" />
        </div>

        <h2 className="text-white text-2xl font-semibold">
          About Moodlens
        </h2>
      </div>

      <p className="text-gray-300 leading-7 max-w-3xl mb-8">
        Moodlens is an AI-powered emotion recognition dashboard designed
        to make facial emotion analysis simple and accessible.
      </p>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#5B8CFF]/10 flex items-center justify-center">
            <Zap className="text-[#5B8CFF]" size={20} />
          </div>

          <h3 className="text-white text-xl font-semibold">
            How It Works
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {steps.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#5B8CFF]/10 flex items-center justify-center">
                <Icon className="text-[#5B8CFF]" size={20} />
              </div>

              <span className="text-white font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/10 flex items-center justify-center">
            <Heart className="text-pink-400" size={20} />
          </div>

          <h3 className="text-white text-xl font-semibold">
            Developed With Passion By
          </h3>
        </div>

        <p className="text-[#5B8CFF] text-lg md:text-xl font-semibold mb-4">
          Roshni • Shweta • Tarana
        </p>

        <p className="text-gray-300 leading-7 max-w-2xl mx-auto">
          Built with curiosity, teamwork, and a shared passion for
          creating meaningful AI experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
