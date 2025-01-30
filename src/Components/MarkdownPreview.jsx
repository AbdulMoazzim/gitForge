import React from 'react'

export default function MarkdownPreview() {
  return (
      <div className="p-4 w-full border-l">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="border p-4 rounded-md bg-white shadow">
          {/* {Object.entries(sectionData).map(([id, values]) => (
            <div key={id} className="mb-4">
              {id === "introduction" && <h1 className="text-2xl">{values.heading}</h1>}
              {id === "banner" && values.image && (
                <img src={values.image} alt="Banner" className="w-full h-32 object-cover" />
              )}
            </div>
          ))} */}
        </div>
      </div>
    );
  };
