import React, { useContext } from "react";
import { data } from "../Context/dataProvider";
import { component } from "../Context/ComponentProvider";
import CustomSection from "./CustomSection";

export default function InputSection() {

  const [sections] = useContext(data);
  const comp = useContext(component);

  return (
    <div className="p-6 w-full lg:w-3/5">
      <div className="mx-auto border-1 border-black p-8 rounded-lg shadow lg:h-[85vh] lg:overflow-y-auto">
        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-md">
          <h2 className="text-3xl font-semibold mb-2">How to Use</h2>
          <ul className="list-disc pl-4 text-gray-700 text-lg">
            <li>Select built-in sections from the sidebar.</li>
            <li>Drag and drop sections to rearrange them.</li>
            <li>Fill in the required details below to customize your profile.</li>
            <li>Preview your changes in real-time on the right panel.</li>
          </ul>
        </div>

        {/* Introduction Inputs */}
        {sections.map((section) => {
          const SectionComponent = comp[section.title];
          if (SectionComponent === CustomSection) {
            return <SectionComponent key={section.id} uniqueId= {section.id}/>
          }
          return <SectionComponent key={section.id}/>;
        })}

      </div>
      </div>
  );
}
