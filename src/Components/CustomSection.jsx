import React, { useContext, useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { data } from "../Context/dataProvider";

export default function CustomSection({ uniqueId }) {
  const [sections, setSections] = useContext(data);

  //  Find section by uniqueId instead of generic title
  const customSection = sections.find((section) => section.id === uniqueId);

  const [format, setFormat] = useState(customSection?.data.format || "paragraph");
  const [paragraphText, setParagraphText] = useState(customSection?.data.text || "");
  const [listItems, setListItems] = useState(customSection?.data.list || []);

  //  Update only the targeted section using uniqueId
  const updateSections = (updatedData) => {
    const newData = sections.map((section) =>
      section.id === uniqueId ? { ...section, data: updatedData } : section
    );
    setSections(newData);
  };
  // Handle adding a new list item
  const addListItem = () => {
    const newItem = { id: Date.now(), text: "" };
    const updatedList = [...listItems, newItem];

    setListItems(updatedList);
    updateSections({ ...customSection.data, list: updatedList });
  };

  // Handle updating a list item
  const updateListItem = (id, newText) => {
    const updatedList = listItems.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );

    setListItems(updatedList);
    updateSections({ ...customSection.data, list: updatedList });
  };

  // Handle deleting a list item
  const deleteListItem = (id) => {
    const updatedList = listItems.filter((item) => item.id !== id);

    setListItems(updatedList);
    updateSections({ ...customSection.data, list: updatedList });
  };

  // Handle switching between paragraph and list format
  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    updateSections({ ...customSection.data, format: newFormat });
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow my-5">
      <h2 className="text-lg font-semibold mb-4">{customSection.data.heading}</h2>

      {/* Radio Box for Rendering Format */}
      <label className="block text-md font-medium mb-2">Render Introduction As:</label>
      <div className="flex gap-4 mb-4 flex-wrap">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="format"
            value="paragraph"
            checked={format === "paragraph"}
            onChange={() => handleFormatChange("paragraph")}
            className="mr-2"
          />
          Paragraph
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="format"
            value="list"
            checked={format === "list"}
            onChange={() => handleFormatChange("list")}
            className="mr-2"
          />
          List
        </label>
      </div>

      {/* Input Fields Based on Selection */}
      {format === "paragraph" ? (
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Write your introduction..."
          value={paragraphText}
          onChange={(e) => {
            setParagraphText(e.target.value);
            updateSections({ ...customSection.data, text: e.target.value });
          }}
        ></textarea>
      ) : (
        <div>
          {/* List Items */}
          {listItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item.text}
                onChange={(e) => updateListItem(item.id, e.target.value)}
                className="border border-gray-300 rounded-md p-2 flex-grow"
                placeholder="Enter a point..."
              />
              <button
                className="p-2 text-red-500 hover:text-red-700"
                onClick={() => deleteListItem(item.id)}
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          {/* Add Point Button */}
          <button
            className="mt-2 flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            onClick={addListItem}
          >
            <FiPlus /> Add Point
          </button>
        </div>
      )}
    </div>
  );
}
