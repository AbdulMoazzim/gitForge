import React, { useContext } from "react";
import { data } from "../Context/dataProvider";


const MarkdownPreview = ({sections}) => {
  return (
      <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-lg h-[80vh] overflow-y-scroll">
        {sections.length === 0 ? (
          <p className="text-gray-500">No sections added yet.</p>
        ) : (
          sections.map((section) => {
            if (section.id === "introduction") {
              return (
                <div
                  key={section.id}
                  className="my-6 p-4 border-b border-gray-300"
                >
                  <h2 className="text-3xl font-bold text-center mb-8">{section.data.heading}</h2>
                  {section.data.format === "list" ? (
                    <ul className="list-disc list-inside mt-2">
                      {section.data.list.map((item) => (
                        <li key={item.id} className="text-lg">{item.text}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg mt-2">{section.data.text}</p>
                  )}
                </div>
              );
            } else if (section.id === "banner") {
              return (
                <div key={section.id} className="my-6">
                  <img
                    src={section.data.url}
                    alt="Banner"
                    className=" h-auto rounded-lg shadow-md w-full"
                  />
                </div>
              );
            } else if (section.id === "contact") {
              return (
                <div key={section.id} className="my-6 p-4 border-b border-gray-300">
                  <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
                  <div className="flex flex-wrap justify-center">
                    {(section.data.length) > 0 ? (
                      section.data.map((item, index) => (
                        <a href={item.url} key={index} target="_blank" rel="noopener noreferrer">
                          <img src={item.badge} alt={item.name} className="px-1" />
                        </a>
                      ))
                        ) : (
                          ""
                        )}
                  </div>
                </div>
              );
            } else if (section.id === "codingStats") {
              return (
                <div key={section.id} className="my-6 p-4 border-b border-gray-300">
                  <h3 className="text-2xl font-bold">Coding Platforms Stats</h3>
                  <div className="flex flex-col items-center space-y-4 mt-4">
                    {Object.entries(section.data).map((item) =>
                      Object.values(item[1]).map((api, subIndex) => (
                        <div key={subIndex}>
                        <h2 className="text-3xl font-bold text-center my-4">{item[0].charAt(0).toUpperCase() + item[0].slice(1)}</h2>
                        <img  
                          src={api} 
                          alt={item[0]} 
                          className="rounded-lg shadow-lg"
                        />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            } else if (section.id === "toolsAndLanguages") {
              return (
                <div key={section.id} className="my-6 p-4 border-b border-gray-300">
                  <h3 className="text-2xl font-bold mb-4">Tools & Languages</h3>
                  <div className="flex flex-wrap">
                    {
                      Object.entries(section.data).map((img)=>(<img src={img[1]} alt={img[0]} title={img[0]} key={img[0]} className="w-[60px] px-1"/>))
                    }
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
  );
};


export default MarkdownPreview;
