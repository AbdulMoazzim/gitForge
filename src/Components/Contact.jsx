import React, { useContext, useState } from "react";
import { data } from "../Context/dataProvider";

const availablePlatforms = {
  Facebook: "https://img.shields.io/badge/Facebook-blue?style=for-the-badge&logo=facebook&logoColor=white",
  Twitter: "https://img.shields.io/badge/Twitter-skyblue?style=for-the-badge&logo=twitter&logoColor=white",
  LinkedIn: "https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white",
  GitHub: "https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=github&logoColor=white",
  Portfolio: "https://img.shields.io/badge/Portfolio-darkblue?style=for-the-badge&logo=internet-explorer&logoColor=white",
  DevTo: "https://img.shields.io/badge/Dev.to-black?style=for-the-badge&logo=devdotto&logoColor=white",
  Hashnode: "https://img.shields.io/badge/Hashnode-blue?style=for-the-badge&logo=hashnode&logoColor=white",
  Discord: "https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"
};

export default function Contact() {
  const [sections, setSections] = useContext(data);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [urls, setUrls] = useState({});

  // Handle selection of platforms
  const handleSelection = (platform) => {
    let updatedPlatforms;
    
    if (!selectedPlatforms.includes(platform)) {
      updatedPlatforms = [...selectedPlatforms, platform];
    } else {
      updatedPlatforms = selectedPlatforms.filter((p) => p !== platform);
    }
  
    setSelectedPlatforms(updatedPlatforms);
  
    // Update sections to reflect the change
    const contactData = updatedPlatforms.map((p) => ({
      name: p,
      url: urls[p] || "", // Preserve previously entered URLs
      badge: availablePlatforms[p],
    }));
  
    const updatedSections = sections.map((section) =>
      section.id === "contact" ? { ...section, data: contactData } : section
    );
  
    setSections(updatedSections);
  };

  // Handle input change and update sections in real time
  const handleUrlChange = (platform, url) => {
    const updatedUrls = { ...urls, [platform]: url };
    setUrls(updatedUrls);
    
    // Update contact data in sections immediately
    const contactData = selectedPlatforms.map((p) => ({
      name: p,
      url: updatedUrls[p] || "",
      badge: availablePlatforms[p],
    }));
    const updatedSections = sections.map((section) =>
      section.id === "contact" ? { ...section, data: contactData } : section
    );

    setSections(updatedSections);
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow my-5">
      <h2 className="text-lg font-semibold mb-4">Contact Section</h2>

      <label className="block mb-2 font-medium">Select Platforms:</label>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(availablePlatforms).map((platform) => (
          <button
            key={platform}
            onClick={() => handleSelection(platform)}
            className={`p-2 border rounded-md text-sm ${
              selectedPlatforms.includes(platform)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-4">
          {selectedPlatforms.map((platform) => (
            <div key={platform} className="mb-2">
              <label className="block font-medium">{platform} URL:</label>
              <input
                type="text"
                value={urls[platform] || ""}
                onChange={(e) => handleUrlChange(platform, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder={`Enter ${platform} profile link`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
