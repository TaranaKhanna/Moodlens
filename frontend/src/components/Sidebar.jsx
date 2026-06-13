import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  LayoutDashboard,
  Upload,
  History,
  Info,
  Sparkles,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] =
    useState("dashboard");
  const isAutoScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const updateActiveItem = () => {
      if (isAutoScrollingRef.current) {
        return;
      }

      const uploadSection =
        document.getElementById("upload-section");
      const historySection =
        document.getElementById("history-section");
      const aboutSection =
        document.getElementById("about-section");

      if (
        !uploadSection ||
        !historySection ||
        !aboutSection
      ) {
        return;
      }

      const activationOffset = 90;
      const currentScroll =
        window.scrollY + activationOffset;
      const uploadTop = uploadSection.offsetTop;
      const historyTop = historySection.offsetTop;
      const aboutTop = aboutSection.offsetTop;

      if (currentScroll >= aboutTop) {
        setActiveItem("about-section");
      } else if (currentScroll >= historyTop) {
        setActiveItem("history-section");
      } else if (currentScroll >= uploadTop) {
        setActiveItem("upload-section");
      } else {
        setActiveItem("dashboard");
      }
    };

    updateActiveItem();

    window.addEventListener(
      "scroll",
      updateActiveItem,
      { passive: true }
    );
    window.addEventListener(
      "resize",
      updateActiveItem
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveItem
      );
      window.removeEventListener(
        "resize",
        updateActiveItem
      );
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveItem(sectionId);
    isAutoScrollingRef.current = true;

    clearTimeout(scrollTimeoutRef.current);

    if (sectionId === "dashboard") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 800);

    setIsOpen(false);
  };

  const getItemClass = (sectionId) =>
    `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all ${activeItem === sectionId
      ? "bg-white/10 text-white"
      : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <>
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

          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        <button
          className="absolute top-6 right-6 text-gray-400 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-200 via-pink-300 to-cyan-200 flex items-center justify-center">
            <Sparkles className="text-[#060B23]" size={20} />
          </div>

          <h1 className="bg-gradient-to-r from-amber-200 via-pink-300 to-cyan-200 bg-clip-text text-2xl font-semibold text-transparent">
            Moodlens
          </h1>
        </div>

        <nav className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("dashboard")}
            className={getItemClass("dashboard")}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("upload-section")}
            className={getItemClass("upload-section")}
          >
            <Upload size={20} />
            <span>Upload</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("history-section")}
            className={getItemClass("history-section")}
          >
            <History size={20} />
            <span>History</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about-section")}
            className={getItemClass("about-section")}
          >
            <Info size={20} />
            <span>About</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
