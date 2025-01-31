import React, { useContext, useEffect, useRef } from "react";
import TurndownService from "turndown";
import MarkdownPreview from "./MarkdownPreview";
import { data } from "../Context/dataProvider"; // Your context import
import ReactDOMServer from "react-dom/server";

export default function FullyFunctionalMD() {
  const previewRef = useRef(null);
  const[sections] = useContext(data)

  const convertToMarkdown = () => {
    const turndownService = new TurndownService();

    // Wrap the MarkdownPreview component with the context provider
    const htmlString = ReactDOMServer.renderToStaticMarkup(
        <MarkdownPreview sections={sections}/>
    );
    console.log(htmlString)

    // Convert the generated HTML to Markdown
    return turndownService.turndown(htmlString);
  };

  const downloadMarkdown = () => {
    const markdownContent = convertToMarkdown();
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="lg:w-2/5 w-full h-screen p-7">
      <div className="p-4 flex justify-around flex-wrap">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={downloadMarkdown}
        >
          Download MD
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Raw MD
        </button>
      </div>
      {/* MarkdownPreview is inside the ref */}
      <div ref={previewRef}>
        <MarkdownPreview sections={sections}/>
      </div>
    </div>
  );
}
