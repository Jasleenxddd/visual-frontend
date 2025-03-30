import React from "react";

const HowItWorks = () => {
  return (
    <div id="learn" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Simple Steps to Generate Questions with Prashna AI
        </h1>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 bg-gray-200 rounded-3xl p-6 sm:p-8">
          {/* Step 1 */}
          <div className="text-center lg:text-left bg-gray-50 rounded-3xl p-6 sm:p-8">
            <div className="mb-4">
              <span className="text-blue-500 text-2xl sm:text-3xl font-bold">1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Upload Your Content</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-7">
              Upload your PDF, paste a URL, or type in text—it's that simple! Prashna AI analyzes your content in seconds, ensuring accurate and relevant questions tailored to your needs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center lg:text-left bg-gray-50 rounded-3xl p-6 sm:p-8">
            <div className="mb-4">
              <span className="text-blue-500 text-2xl sm:text-3xl font-bold">2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Customize Your Questions</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-7">
              Choose from multiple-choice, true/false, or fill-in-the-blank formats. Adjust difficulty levels to suit your audience or let Prashna AI automatically generate questions for a hassle-free experience.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center lg:text-left bg-gray-50 rounded-3xl p-6 sm:p-8">
            <div className="mb-4">
              <span className="text-blue-500 text-2xl sm:text-3xl font-bold">3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Download or Share</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-7">
              Download your questions instantly or share them directly with your team. Prashna AI ensures seamless integration into your workflow, saving you time and effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
