import React from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import SwiperComponent from "../Components/SwiperComponent";

const HomePage = () => {
  return (
    <div>
      <div className="container mx-auto text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to <span className="text-blue-600">GitForge</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Create, style, and export stunning GitHub profiles with ease! Customize your profile sections and generate ready-to-use Markdown and HTML files.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/MyProfile"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Why Choose GitForge?
          </h2>
          <p className="text-lg text-gray-600 px-6">
            Our intuitive tool allows you to craft personalized GitHub profiles that stand out and reflect your projects and skills effectively.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <Card title="Customizable Sections" description="Select and personalize different sections to highlight your expertise." />
            <Card title="Live Preview" description="Instantly preview your profile in HTML format as you edit." />
            <Card title="Markdown Export" description="Generate ready-to-use Markdown files for your GitHub README effortlessly." />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto text-center py-12">
        <h2 className="text-3xl font-semibold mb-6">What Users Are Saying</h2>
        <div className="hidden md:flex justify-center flex-wrap gap-10">
          <SwiperComponent />
        </div>
        <div className="flex md:hidden justify-center flex-wrap gap-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-gray-600 mb-4">
              "GitForge made my GitHub profile creation simple and effective. The Markdown export feature is a lifesaver!"
            </p>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-sm text-gray-500">Full-Stack Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-gray-600 mb-4">
              "I love the live preview feature. It lets me see my changes instantly, making the process seamless."
            </p>
            <h4 className="font-semibold">Jane Smith</h4>
            <p className="text-sm text-gray-500">Data Scientist</p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
            <Card title="Step 1: Add Your Info" description="Input your details, including bio, skills, projects, and more." />
            <Card title="Step 2: Customize the Layout" description="Arrange sections, adjust fonts, and tweak styles to your liking." />
            <Card title="Step 3: Export & Use" description="Download the Markdown or HTML file and integrate it with your GitHub profile." />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 GitForge. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
