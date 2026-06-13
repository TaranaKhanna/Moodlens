import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UploadCard from "./components/Uploadcard";
import ResultCard from "./components/ResultCard";
import RecentAnalyses from "./components/RecentAnalyses";
import About from "./components/About";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="bg-[#020817] min-h-screen overflow-x-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main id="dashboard" className="lg:ml-[260px]">
        <Navbar setIsOpen={setIsOpen} />

        <div className="px-4 pb-20 pt-8 md:px-8 md:pb-28 md:pt-12">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-14 mt-8">
            <section id="upload-section" className="scroll-mt-6">
              <UploadCard
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                loading={loading}
                setLoading={setLoading}
                setResult={setResult}
                setError={setError}
              />
            </section>
            <ResultCard
              selectedImage={selectedImage}
              loading={loading}
              result={result}
              error={error}
            />
          </div>

          <section id="history-section" className="mt-14 md:mt-20 scroll-mt-8">
            <RecentAnalyses />
          </section>

          <section id="about-section" className="mt-14 md:mt-20 scroll-mt-8">
            <About />
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;
