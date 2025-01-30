import React from "react";
import { Sidebar } from "../Components/Sidebar";
import InputSection from "../Components/InputSection";
import MarkdownPreview from "../Components/MarkdownPreview";

const PageWithSidebar = () => {
  return (
    <div className="flex">
      <div className="w-[15%]">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="w-[85%] flex">
        {/* Main Content */}
        <InputSection />
        <MarkdownPreview />
      </div>
    </div>
  );
};

export default PageWithSidebar;
