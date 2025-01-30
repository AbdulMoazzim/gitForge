import React, { useContext, useState } from 'react';
import { data } from '../Context/dataProvider';

const CodingPlatformsComponent = () => {
    const [sections, setSections] = useContext(data);

    const [usernames, setUsernames] = useState({
        github: '',
        codeforces: '',
        leetcode: ''
    });

    const updatePlatformStats = (updatedData) => {
        const newData = sections.map((section) => {
            return section.id === "codingStats" ? { ...section, data: updatedData } : section;
        });
        setSections(newData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setUsernames((prev) => ({
            ...prev,
            [name]: value
        }));

        const data = {};

        if (name === "github" && value) {
            data.github = {
                api: `https://api.github.com/users/${value}`,
                streak: `https://github-readme-streak-stats.herokuapp.com/?user=${value}`,
                mostUsedLang: `https://github-readme-stats.vercel.app/api/top-langs/?username=${value}`,
                profileView: `https://github.com/${value}`
            };
        }

        if (name === "codeforces" && value) {
            data.codeforces = {
                api: `https://codeforces.com/api/user.info?handles=${value}`,
                streak: `https://codeforces.com/profile/${value}`,
                mostUsedLang: `https://codeforces.com/problemset?tags=${value}`,
                profileView: `https://codeforces.com/profile/${value}`
            };
        }

        if (name === "leetcode" && value) {
            data.leetcode = {
                api: `https://leetcode.com/api/users/${value}`,
                streak: `https://leetcode.com/streak/${value}`,
                mostUsedLang: `https://leetcode.com/api/languages/${value}`,
                profileView: `https://leetcode.com/${value}`
            };
        }

        setPlatformData((prev) => ({ ...prev, ...data }));
        updatePlatformStats(data); // Ensure that updated data is passed
    };

    const [platformData, setPlatformData] = useState({});

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-5">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Stats of Coding Platforms</h1>

            <div className="space-y-4">
                {["github", "codeforces", "leetcode"].map((platform) => (
                    <div key={platform}>
                        <label className="block text-gray-700 text-sm font-medium">
                            {platform.charAt(0).toUpperCase() + platform.slice(1)} Username
                        </label>
                        <input
                            type="text"
                            name={platform}
                            value={usernames[platform]}
                            onChange={handleInputChange}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                ))}
            </div>

          
        </div>
    );
};

export default CodingPlatformsComponent;
