import React, { useContext, useState } from "react";
import { data } from "../Context/dataProvider";

export default function Banner() {
  const [sections, setSections] = useContext(data);
  const bannerSection = sections.find((section) => section.id === "banner") || { data: {} };

  const [image, setImage] = useState(bannerSection.data?.url || null);
  const [position, setPosition] = useState(bannerSection.data?.position || "full");

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      updateBannerData({ position, url: imageUrl });
    }
  };

  // Update banner section data
  const updateBannerData = (updatedData) => {
    const updatedSections = sections.map((section) =>
      section.id === "banner" ? { ...section, data: updatedData } : section
    );
    setSections(updatedSections);
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow my-5">
      <h2 className="text-lg font-semibold mb-4">Banner Section</h2>

      {/* Image Upload */}
      <label className="block mb-2 font-medium">Upload Banner Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border border-gray-300 p-2 rounded-md"
      />

    </div>
  );
}
