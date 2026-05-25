import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UploadCard from "./components/Uploadcard";
import ResultCard from "./components/ResultCard";
import WeeklyTrend from "./components/Weeklytrend";
import RecentAnalyses from "./components/RecentAnalyses";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  return (
    <div className="bg-[#020817] min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <main className="lg:ml-[260px]">
        <Navbar setIsOpen={setIsOpen} />

        <div className="p-4 md:p-8">

          {/* Top Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <UploadCard
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              loading={loading}
              setLoading={setLoading}
              setResult={setResult}
            />
            <ResultCard
              selectedImage={selectedImage}
              loading={loading}
              result={result}
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6 items-stretch">
            {/* Weekly Trends */}
            <div className="xl:col-span-1">
              <WeeklyTrend />
            </div>

            {/* Recent Analyses */}
            <div className="xl:col-span-2">
              <RecentAnalyses />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;