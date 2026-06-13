import { Menu } from "lucide-react";

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="h-[90px] border-b border-white/10 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
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

      <div className="hidden sm:flex items-center">
        <p className="bg-gradient-to-r from-amber-200 via-pink-300 to-cyan-200 bg-clip-text text-sm md:text-base font-semibold text-transparent">
          Understand emotions through AI ✨
        </p>
      </div>
    </header>
  );
};

export default Navbar;
