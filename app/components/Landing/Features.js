import React from "react";
import Image from "next/image";
import feature1 from "@/assets/feature-1.png";
import feature2 from "@/assets/feature-2.png";
import feature3 from "@/assets/feature-3.png";

const Features = () => {
  return (
    <div id="about" className="py-20 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 px-4">
        Discover How Prashna AI Simplifies Question Creation
      </h1>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col-reverse lg:flex-row items-center max-w-5xl mx-auto gap-12 px-4">
          <div className="info max-w-lg text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-blue-500">Extract Questions</span> from Any Content
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-8">
              Turn your documents, web pages, or text into well-structured questions in seconds.
              Whether you're working with PDFs, URLs, or plain text, Prashna AI ensures seamless
              extraction tailored to your needs—perfect for educators, students, and professionals.
            </p>
          </div>
          <Image
            src={feature1}
            alt="Extract Questions"
            className="w-full lg:w-96 h-auto"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center max-w-5xl mx-auto gap-12 px-4">
          <Image
            src={feature2}
            alt="Create Multiple Question Types"
            className="w-full lg:w-96 h-auto"
          />
          <div className="info max-w-lg text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Create <span className="text-blue-500">Customizable Question Formats</span> for Every Scenario
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-8">
              Generate multiple-choice, true/false, or fill-in-the-blank questions with ease.
              Customize the difficulty level and format to match your audience—whether it's for exams,
              training sessions, or study guides.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center max-w-5xl mx-auto gap-12 px-4">
          <div className="info max-w-lg text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-blue-500">Automate Question Creation</span> with AI Precision
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-8">
              Save time and effort by letting Prashna AI handle question generation.
              Our advanced algorithms create accurate and relevant questions instantly, so you
              can focus on what matters most—teaching, learning, or analyzing.
            </p>
          </div>
          <Image
            src={feature3}
            alt="Simplify Assessments"
            className="w-full lg:w-96 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
