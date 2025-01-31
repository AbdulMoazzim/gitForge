import React from "react";
import { Sidebar } from "../Components/Sidebar";
import InputSection from "../Components/InputSection";
import FullyFunctionalMD from "../Components/FullyFunctionalMD";

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
        <FullyFunctionalMD />
      </div>
    </div>
  );
};

export default PageWithSidebar;
