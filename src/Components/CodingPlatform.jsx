import React, { useContext, useEffect, useState } from "react";
import { data } from "../Context/dataProvider";
import { RiDeleteBin6Line } from "react-icons/ri";

const CodingPlatformsComponent = () => {
  const [sections, setSections] = useContext(data);
  const [usernames, setUsernames] = useState(() => {
    return JSON.parse(localStorage.getItem("usernames")) || {
      github: "",
      codeforces: "",
      leetcode: "",
    };
  });
  const [platformData, setPlatformData] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("usernames", JSON.stringify(usernames));
  }, [usernames]);

  const updatePlatformStats = (updatedData) => {
    const newData = sections.map((section) =>
      section.id === "codingStats" ? { ...section, data: updatedData } : section
    );
    setSections(newData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsernames((prev) => ({ ...prev, [name]: value }));
  };

  const storeApi = (platform) => {
    const value = usernames[platform];
    if (!value) return;

    const theme = darkMode ? "dark" : "light";
    const data = { ...platformData };

    if (platform === "github") {
      data.github = {
        streak: `https://github-readme-streak-stats.herokuapp.com/?user=${value}&theme=${theme}`,
        mostUsedLang: `https://github-readme-stats.vercel.app/api/top-langs/?username=${value}&theme=${theme}`,
      };
    }
    if (platform === "codeforces") {
      data.codeforces = {
        api: `https://codeforces-readme-stats.vercel.app/api/card?username=${value}&theme=${theme}`,
        streak: `https://codeforces-readme-stats.vercel.app/api/badge?username=${value}&theme=${theme}`,
      };
    }
    if (platform === "leetcode") {
      data.leetcode = {
        api: `https://leetcard.jacoblin.cool/${value}?theme=${theme}&font=Encode%20Sans%20Semi%20Expanded&ext=heatmap`,
      };
    }

    setPlatformData(data);
    updatePlatformStats(data);
  };

  const deleteApi = (platform) => {
    const updatedData = { ...platformData };
    delete updatedData[platform];
  
    setUsernames((prev) => ({ ...prev, [platform]: "" })); 
    setPlatformData(updatedData);
    updatePlatformStats(updatedData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-5">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Stats of Coding Platforms
      </h1>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="themeToggle"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="mr-2"
        />
        <label htmlFor="themeToggle" className="text-gray-700">
          Dark Mode APIs
        </label>
      </div>

      <div className="space-y-4">
        {["github", "codeforces", "leetcode"].map((platform) => (
          <div key={platform} className="flex flex-col space-x-2">
            <input
              type="text"
              name={platform}
              value={usernames[platform]}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Username`}
            />
            <div className="py-2">
            <button
                className="mt-2 px-3 mx-3 py-1 font-semibold rounded-lg text-red-500"
                onClick={() => deleteApi(platform)}
              >
                <RiDeleteBin6Line />
              </button>
            <button
              className="px-4 py-2 mx-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => storeApi(platform)}
            >
              Add
            </button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default CodingPlatformsComponent;
