import { Menu, Search } from "lucide-react";

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="h-[90px] border-b border-white/10 flex items-center justify-between px-4 md:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>

        <h1 className="text-white text-2xl md:text-4xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-3 bg-[#0B122B] border border-white/10 rounded-2xl px-4 py-3 w-[220px] md:w-[320px]">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search analyses..."
            className="bg-transparent outline-none text-white placeholder:text-gray-500 w-full"
          />
        </div>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-[#5B8CFF] flex items-center justify-center text-black font-semibold">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;