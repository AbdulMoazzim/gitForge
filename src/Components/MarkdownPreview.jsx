import React, { useContext } from "react";
import { data } from "../Context/dataProvider";

// Function to generate Markdown from sections
const generateMarkdown = (sections) => {
  return sections
    .map((section) => {
      if (section.title === "Introduction") {
        return `## ${section.data.heading}\n\n${section.data.text}`;
      } else if (section.title === "Banner") {
        return `![Banner Image](${section.data.url})`;
      } else if (section.title === "Contact") {
        return `### Contact Info\n\n${Object.entries(section.data)
          .map(([key, value]) => `**${key}:** ${value}`)
          .join("\n")}`;
      } else if (section.title === "Coding Platforms Stats") {
        return `### Coding Stats\n\nGithub: ${section.data.github?.username || "N/A"}`;
      } else if (section.title === "Tools and Languages") {
        return `### Tools & Languages\n\n${section.data.list?.join(", ") || "N/A"}`;
      }
      return `### ${section.title}\n\n(Custom Section)`;
    })
    .join("\n\n---\n\n");
};

// Function to download Markdown file
const downloadMarkdown = (content) => {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "readme.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const MarkdownPreview = () => {
  const [sections, setSections] = useContext(data)
  const markdownContent = generateMarkdown(sections);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full lg:w-2/5">
      {/* Buttons Section */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => downloadMarkdown(markdownContent)}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Download MD
        </button>
        <button
          onClick={() => alert(markdownContent)}
          className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Raw MD
        </button>
      </div>

      {/* Preview Section */}
      <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-lg">
        {sections.length === 0 ? (
          <p className="text-gray-500">No sections added yet.</p>
        ) : (
          sections.map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-xl font-bold">{section.title}</h2>

              {/* Conditional Rendering */}
              {section.id === "introduction" && <p>{section.data.text}</p>}
              {section.id === "banner" && (
                <img src={section.data.url} alt="Banner" className="w-full rounded-lg" />
              )}
              {section.id === "contact" &&
                Object.entries(section.data).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              {section.id === "codingStats" && (
                <p>GitHub: {section.data.github?.username || "N/A"}</p>
              )}
              {section.id === "toolsAndLanguages" && (
                <p>Tools: {section.data.list?.join(", ") || "N/A"}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MarkdownPreview;
