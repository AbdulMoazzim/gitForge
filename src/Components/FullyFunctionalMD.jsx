import React, { useState, useEffect, useContext } from "react";
import MarkdownPreview from "./MarkdownPreview";
import { data } from "../Context/dataProvider"; // Importing context
import RenderMd from "./RenderMd";
import { renderToStaticMarkup } from "react-dom/server";
import TurndownService from "turndown";

export default function FullyFunctionalHTML() {
  const [state, setState] = useState(false);
  const [info, setInfo] = useState(""); // Store the converted HTML
  const [sections] = useContext(data); // Get sections from context;
  const [hidden, setHidden] = useState(true);
  const td = new TurndownService();

  useEffect(() => {
    if (sections.length === 0) {
      setInfo(""); 
      return;
    }
  
    // Convert React component to static HTML
    const htmlContent = renderToStaticMarkup(
        <MarkdownPreview sections={sections.filter((section) => section.id !== "toolsAndLanguages")} />
  
    );
    
    // Pass the generated HTML content to the conversion function
    conversion(htmlContent);
  }, [sections]); // Runs when `sections` change
  

  const conversion = (md) => {
    if (!md) return;
  
    // Convert the toolsAndLanguages section to static HTML
    const toolsHtml = sections
      .filter((section) => section.id === "toolsAndLanguages")
      .map((sec) => (
        <React.Fragment key={sec.id}>
          <div className="my-6 p-4">
            <h3 className="text-2xl font-bold mb-4">Tools & Languages</h3>
            <div className="flex flex-wrap">
              {Object.entries(sec.data).map((img) => (
                <img
                  src={img[1]}
                  alt={img[0]}
                  title={img[0]}
                  key={img[0]}
                  style={{ width: '60px', padding: "0 5px" }} // Inline style for width
                />
              ))}
            </div>
          </div>
          <hr />
        </React.Fragment>
      ));
  
    // Convert the JSX to static HTML for toolsAndLanguages
    const toolsHtmlString = renderToStaticMarkup(toolsHtml);
    const wholeString = td.turndown(md);
  
    // Combine the markdown with the toolsHtmlString
    setInfo(wholeString.slice(0,wholeString.length-5) + toolsHtmlString); // Update state with styled HTML
  };
  
  const downloadHTML = () => {
    if (info) {
      const blob = new Blob([info], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "readme.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="lg:w-2/5 w-full h-screen p-7">
      <div className="p-4 flex justify-around flex-wrap">
        <button
          className="px-4 py-2 m-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={downloadHTML}
        >
          Download readme.md
        </button>
        <button
          className="px-4 py-2 m-2 text-black font-semibold rounded-lg border-1 border-gray-400"
          onClick={() => setState(true)} 
        >
          Raw Data
        </button>
      </div>

      <div>
        {!state ? (
          <div>
            <MarkdownPreview sections={sections}/>
          </div>
        ) : (
          <div className=" h-[80vh]">
            <div className="w-full flex justify-around items-center flex-wrap py-3">
              <button onClick={() => setState(false)} className="px-4 py-2 text-black font-semibold rounded-lg border-1 border-gray-400">
                Back &lt;-
              </button>
              <div className="flex flex-col">
                <p className={hidden ? "hidden": "block"}>Copied!</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(info)
                  setHidden(false);
                  setTimeout(()=>{
                    setHidden(true);
                  },1000)
                }
                }
              >
                Copy
              </button>
              </div>
            </div>
            <div className="p-4 overflow-hidden h-full w-full border border-gray-300 bg-white rounded-lg shadow-lg " >
                <RenderMd info={info} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
