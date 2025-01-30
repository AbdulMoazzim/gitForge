import React from "react";
import { Sidebar } from "../Components/Sidebar";
import InputSection from "../Components/InputSection";
import MarkdownPreview from "../Components/MarkdownPreview";

const PageWithSidebar = () => {
  return (
    <div className="overflow-y-scroll lg:overflow-y-hidden flex flex-col lg:flex-row">
      <div className="lg:w-[15%] w-full">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="lg:w-[85%] flex w-full flex-col lg:flex-row">
        {/* Main Content */}
        <InputSection />
        <MarkdownPreview />
      </div>
    </div>
  );
};

export default PageWithSidebar;
