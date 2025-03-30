"use client";

import React from 'react';
import Accordion from './Accordion';

const FAQs = () => {
  const faqData = [
    {
      heading: "What is Prashna AI?",
      data: `Prashna AI is a platform designed to help users generate insightful questions from content. It supports various input types and is perfect for students, educators, and content creators.
      Key Features:
      Generate Questions from Topics: Provide topics or concepts, and Prashna AI generates relevant questions.
      Audio and Video Support: Upload audio or video files, and Prashna AI can analyze the content to create questions.
      YouTube URLs: Enter YouTube video links to extract and analyze content for question generation.
      `
    },
    {
      heading: "What are the ways to input content in Prashna AI?",
      data: `You can input content in multiple formats:
      PDF Upload: Upload documents to generate questions based on their content.
      URL Input: Enter URLs, including articles or websites, for analysis.
      Text Input: Paste plain text directly into the platform.
      Audio and Video Files: Upload audio or video content, and Prashna AI will generate questions based on the content.
      YouTube URLs: Provide links to YouTube videos to create questions from the video’s transcript.
      `
    },
    
    {
      heading: "What is the refund policy for Prashna AI?",
      data: "Refunds are offered if you contact us within 15 days from the start of your subscription. If you are dissatisfied, reach out to us for assistance."
    },


    {
      heading: "Does Prashna AI offer discounts for students or non-profit organizations?",
      data: "Yes, we provide special discounts for students and non-profits. Please email us with your proof of eligibility (e.g., student ID or non-profit certification), and we’ll assist you further."
    },
    {
      heading: "Do you have an affiliate program?",
      data: "Yes, we have an affiliate program. Earn 5% commission on every successful referral. To learn more or join the program, contact us."
    },
    {
      heading: "What subscription plans does Prashna AI offer?",
      data: `We currently offer the following plans:
      Free Plan: Access limited features for personal use.
      Individual Plan: Full access for one user, including all input formats.
      `
    },
    {
      heading: "How can I contact Prashna AI for support or queries?",
      data: "For support, feedback, or queries, contact us at hello@prashna.co. Our team is happy to assist you."
    },
    {
      heading: "How secure is my data on Prashna AI?",
      data: "We prioritize data security. Uploaded files and content are processed securely and deleted after use. For more details, refer to our privacy policy."
    },
    {
      heading: "What are the typical use cases for Prashna AI?",
      data: `Prashna AI can be used for:
      Education: Creating practice questions for students.
      Research: Generating discussion topics from research papers or articles.
      Content Creation: Preparing quizzes or interview questions.
      Training: Analyzing content for corporate training or workshops.
      `
    },
    {
      heading: "How can I track my subscription or credits?",
      data: "You can view your active subscription, remaining credits, and transaction history by logging into your Prashna AI account."
    },
    {
      heading: " Do you offer bulk pricing for organizations or institutions?",
      data: "Yes, we offer custom pricing for large organizations or educational institutions. Please email us at hello@prashna.co for more information."
    },
    {
      heading: "Is there a free trial available?",
      data: "Yes, new users can explore Prashna AI using our Free Plan, which includes basic features and limited credits."
    },
  ];

  return (
    <div className="w-full  mx-auto px-4 py-20 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our services and processes.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            heading={faq.heading}
            data={faq.data}
          />
        ))}
      </div>

    </div>
  );
};

export default FAQs;