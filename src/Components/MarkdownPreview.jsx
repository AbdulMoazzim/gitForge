
import React from "react";

const MarkdownPreview = ({sections}) => {

  return (
    <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-lg h-[80vh] overflow-y-scroll">
      {sections.length === 0 ? (
        <p className="text-gray-500">No sections added yet.</p>
      ) : (
        sections.map((section) => {
          if (section.id === "introduction") {
            return (
              <React.Fragment key={section.id}>
                <div className="mt-6 p-4">
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
                <hr />
              </React.Fragment>
            );
          } else if (section.id === "contact") {
            return (
              <React.Fragment key={section.id}>
                <div className="my-6 p-4">
                  <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
                  <div className="flex flex-wrap justify-center">
                    {section.data.length > 0 ? (
                      section.data.map((item, index) => (
                        <a
                          href={item.url}
                          key={index}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={item.badge} alt={item.name} className="px-1" />
                        </a>
                      ))
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <hr />
              </React.Fragment>
            );
          } else if (section.id === "codingStats") {
                  return (
                    <React.Fragment key={section.id}>
                      <div className="my-6 p-4">
                        <h3 className="text-2xl font-bold">Coding Platforms Stats</h3>
                            {Object.entries(section.data).map(([platform, stats], index) => (
                        <div key={index}>
                        <h3 className="text-2xl py-4 font-bold">{platform[0].toUpperCase() + platform.substring(1)}</h3>
                        <table className="w-full border-none mt-4">
                          <tbody>
                              <tr>
                              {Object.values(stats).map((api, subIndex) => (
                                  <td className="p-2" key={subIndex}>
                                    <img
                                      key={subIndex}
                                      src={api}
                                      alt={platform}
                                    />
                                </td>
                                  ))}
                                  </tr>
                            </tbody>
                        </table>
                        </div>
                            ))}
                      </div>
                      <hr />
                    </React.Fragment>
                  );
                } else if (section.id === "toolsAndLanguages") {
            return (
              <React.Fragment key={section.id}>
                <div className="my-6 p-4">
                  <h3 className="text-2xl font-bold mb-4">Tools & Languages</h3>
                  <div className="flex flex-wrap">
                    {Object.entries(section.data).map((img) => (
                      <img
                        src={img[1]}
                        alt={img[0]}
                        title={img[0]}
                        key={img[0]}
                        className="w-[60px] px-1"
                      />
                    ))}
                  </div>
                </div>
                <hr />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={section.id}>
                <div className="mt-6 p-4">
                  <h2 className="text-3xl font-bold mb-8">{section.data.heading}</h2>
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
                <hr />
              </React.Fragment>
            );
          }
        })
      )}
    </div>
  );
};

export default MarkdownPreview;