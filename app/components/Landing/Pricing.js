"use client";

import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Free",
      price: "$0",
      description: "Enables you to test our features.",
      features: [
        "15 credits/month",
        "1 user account",
        "Watermark on Exports",
        "Basic email support"
      ],
      button: {
        text: "Start for free",
        link: "/signup",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        hoverColor: "hover:bg-blue-200",
      },
      borderColor: "border-gray-200",
    },
    {
      title: "Individual Plan",
      price: "$11.99/month or $99/year",
      description: "Best plan for individuals.",
      features: [
        "75 credits/month",
        "1 user account",
        "No Watermark on Exports",
        "Email Support",
        "Questions from Video & Audio files",
        "15-day money-back guarantee"
      ],
      button: {
        text: "Subscribe",
        link: "/signup",
        bgColor: "bg-blue-500",
        textColor: "text-white",
        hoverColor: "hover:bg-blue-600",
      },
      borderColor: "border-blue-500",
      extraNote: "Are you a student? Request student discount by dropping an email to hello@prashna.co before subscribing."
    },
    {
      title: "Team Plan",
      price: "$19.99/month or $199/year",
      description: "Suitable for a team of up to 5 people.",
      features: [
        "100 credits/month/user account",
        "Maximum 5 user accounts",
        "No Watermark on Exports",
        "Email and On-Call Support",
        "Questions from Video & Audio files",
        "15-day money-back guarantee"
      ],
      button: {
        text: "Subscribe",
        link: "/signup",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        hoverColor: "hover:bg-blue-200",
      },
      borderColor: "border-gray-200",
      extraNote: "Are you a student? Request student discount by dropping an email to hello@prashna.co before subscribing."
    },
  ];

  return (
    <div id="pricing"  className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Flexible Plans for Every Learner and Professional
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg border-2 ${plan.borderColor} p-8 flex flex-col justify-between`}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-4">{plan.title}</h2>
                <h1 className="text-xl font-bold mb-4">{plan.price}</h1>
                <p className="mb-6 text-gray-700 text-sm mt-4">{plan.description}</p>
                <ul className="text-gray-700 text-base leading-7 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <Check className="text-blue-500 w-6 h-6 mr-2" /> {feature}
                    </li>
                  ))}
                </ul>
                {plan.extraNote && (
                  <p className="text-xs text-gray-700 mb-2">{plan.extraNote}</p>
                )}
              </div>
              {plan.button.link ? (
                <Link href={plan.button.link} className="inline-block">
                  <button
                    className={`w-full py-3 ${plan.button.bgColor} ${plan.button.textColor} font-semibold rounded ${plan.button.hoverColor} transition`}
                  >
                    {plan.button.text}
                  </button>
                </Link>
              ) : (
                <button
                  className={`w-full py-3 ${plan.button.bgColor} ${plan.button.textColor} font-semibold rounded ${plan.button.hoverColor} transition`}
                  onClick={plan.button.onClick}
                >
                  {plan.button.text}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <p className="text-md text-gray-700 mb-1">
            Looking for more tailored plans? We're happy to help! Reach out to us at<a href="mailto:hello@prashna.co" className="text-blue-600 hover:underline"> hello@prashna.co</a>, and we'll find the perfect solution for you.
          </p>
          </div>
      </div>
    </div>
  );
};

export default Pricing;