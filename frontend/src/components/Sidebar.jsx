import {
  LayoutDashboard,
  Upload,
  History,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-[260px] min-h-screen
          bg-[#060B23]
          border-r border-white/10
          px-6 py-8
          transform transition-transform duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Close Button Mobile */}
        <button
          className="absolute top-6 right-6 text-gray-400 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-2xl bg-[#5B8CFF] flex items-center justify-center">
            <Sparkles className="text-black" size={20} />
          </div>

          <h1 className="text-white text-2xl font-semibold">
            Moodlens
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <button className="flex items-center gap-3 bg-white/10 text-white px-4 py-4 rounded-2xl">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-4 rounded-2xl transition-all">
            <Upload size={20} />
            <span>Upload</span>
          </button>

          <button className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-4 rounded-2xl transition-all">
            <History size={20} />
            <span>History</span>
          </button>

          <button className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-4 rounded-2xl transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;