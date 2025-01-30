import React, { useState, useContext } from "react";
import { data } from "../Context/dataProvider";
import { RiDeleteBin6Line } from "react-icons/ri";

const ToolsComponent = () => {
  const [sections, setSections] = useContext(data);
  const [inputValue, setInputValue] = useState("");
  const [tools, setTools] = useState({});

  // Function to add a new tool
  const handleAddTool = () => {
    if (!inputValue.trim()) return; // Prevent empty input

    const toolKey = inputValue.toLowerCase();
    const toolIcon = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${toolKey}/${toolKey}-original.svg`;

    setTools((prevTools) => ({
      ...prevTools,
      [toolKey]: toolIcon,
    }));


    updateSections({ ...tools, [toolKey]: toolIcon });
    setInputValue(""); // Clear input after adding
  };

  // Function to update context
  const updateSections = (updatedTools) => {
    const newData = sections.map((section) =>
      section.id === "toolsAndLanguages" ? { ...section, data: updatedTools } : section
    );
    setSections(newData);
  };

  // Function to remove a tool
  const handleRemoveTool = (toolKey) => {
    const updatedTools = { ...tools };
    delete updatedTools[toolKey];
    setTools(updatedTools);
    updateSections(updatedTools);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md my-5">
      <h2 className="text-xl font-semibold mb-4">Add Your Tools & Technologies</h2>

      {/* Input and Add Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter tool name (e.g., react, python)"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleAddTool}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {/* Display Tools */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {Object.entries(tools).map(([key, icon]) => (
          <div key={key} className="flex flex-col items-center">
            <img src={icon} alt={key} className="w-12 h-12" />
            <p className="text-sm">{key}</p>
            <button
              onClick={() => handleRemoveTool(key)}
              className="text-red-500 text-2xl mt-1"
            >
             <RiDeleteBin6Line />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsComponent;
