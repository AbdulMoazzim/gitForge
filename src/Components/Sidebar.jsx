import React, { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createPortal } from "react-dom";
import { data } from "../Context/dataProvider";
import Introduction from "./Introduction";
import Banner from "./Banner";
import Contact from "./Contact";
import CodingPlatform from "./CodingPlatform";
import ToolsComponent from "./ToolsComponent";

export const Sidebar = () => {

  const BuiltInSections = [
    { title: "Introduction", id: "introduction", data: {format: "paragraph", text: "", list: [], heading: "Hello There!"}, component: Introduction },
    { title: "Banner", id: "banner", component: Banner, data: {url: "", position: "full"}},
    { title: "Contact", id: "contact", data: {}, component: Contact },
    { title: "Coding Platforms Stats", id: "codingStats", component: CodingPlatform, data: {github:{}, leetcode: {}, codeForces: {}} },
    { title: "Tools and Languages", id: "toolsAndLanguages", component: ToolsComponent, data: {} },
  ];

  
  const [sections, setSections] = useContext(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [val, setVal] = useState("");
  const [hidden, setHidden] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(result.source.index, 1); // Remove dragged item
    updatedSections.splice(result.destination.index, 0, movedSection); // Insert at new position

    setSections(updatedSections);
  };

  return (
    <>
      <div className="lg:border-r-2 lg:border-b-0 border-gray-800 border-b-2 lg:h-screen overflow-y-auto lg:pb-[80px]">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Your Sections</h2>
          <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <ul
                className="w-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sections.length === 0 ? (
                  <p className="text-gray-500 text-center">Sections will be displayed here</p>
                ) : (
                  sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4 flex items-center w-full justify-between py-2 px-4 border border-blue-600 shadow-lg rounded-2xl bg-white cursor-pointer"
                        >
                          <a
                            href={`#${section.id}`}
                            className="text-lg hover:font-bold transition duration-300"
                          >
                            {section.title}
                          </a>
                          <button
                            className="text-red-500 cursor-pointer"
                            title="Remove Section"
                            onClick={() =>
                              setSections(sections.filter((s) => s.id !== section.id))
                            }
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        </div>

        <div className="p-4 border-y-2 border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Built-in Sections</h2>
          <ul className="w-full">
            {BuiltInSections.map((section) => (
              <li
                key={section.id}
                className="mb-4 flex items-center py-2 w-full justify-center border border-blue-600 shadow-lg rounded-2xl cursor-pointer"
                title="Click to add section"
                onClick={() => {
                  if (!sections.some((s) => s.id === section.id)) {
                    setSections([...sections, section]);
                  }
                }}
              >
                <a
                  href={`#${section.id}`}
                  className="text-lg hover:font-bold transition duration-300"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Custom Section</h2>
          <div className="w-full flex justify-center">
            <button
              className="w-full py-2 bg-blue-600 text-white rounded-2xl"
              onClick={() => setIsModalOpen(true)}
            >
              Add Section
            </button>
          </div>
        </div>
      </div>

      {/* Render portal when isModalOpen is true */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-[#00000050] flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-2/5 w-4/5">
              <h2 className="text-xl font-bold mb-4">Custom Section</h2>
              <input
                type="text"
                placeholder="Enter section name"
                className="border border-gray-300 p-2 mt-6 rounded-md w-full"
                value={val} onChange={(e) => {
                  setVal(e.target.value);
                  setHidden(false);
                }}
              />
              <p className={`text-red-400 mb-6 ${hidden ? `block` : `hidden`}`}>Input Field is required!</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => {
                    if (val.length === 0) {
                      setHidden(true);
                      return
                    }
                    setIsModalOpen(false);
                    setSections([
                      ...sections,
                      { title: val, id: val.toLowerCase(), component: null, data: {} },
                    ]);}}
                >
                  Add
                </button>
              </div>
            </div>
          </div>,
          document.body.querySelector("#portal")
        )}
    </>
  );
};
