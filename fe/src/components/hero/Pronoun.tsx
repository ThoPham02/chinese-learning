import { Search } from "lucide-react";
import { useState } from "react";
import TabNavigation from "./TabNavigation";
import ConsonantsSection from "./ConsonantsSection";
import VowelsSection from "./VowelsSection";
import TonesSection from "./TonesSection";

const Pronoun = () => {
  const [activeTab, setActiveTab] = useState("consonants");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="">
      <div className="px-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-2">
          Hướng Dẫn Phát Âm Tiếng Trung Quốc
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Học cách phát âm chính xác cho người mới bắt đầu
        </p>

        <div className="relative max-w-md mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm âm tiết..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                        placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "consonants" && (
          <ConsonantsSection searchTerm={searchTerm} />
        )}
        {activeTab === "vowels" && <VowelsSection searchTerm={searchTerm} />}
        {activeTab === "tones" && <TonesSection />}
      </div>
    </main>
  );
};

export default Pronoun;
