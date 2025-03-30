
import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  const privacyPolicyText = `
    Prashna ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
    This Privacy Policy explains how we collect, use, and protect your data when you use our app.

    1. Information We Collect  
       We may collect the following types of information:  
       - Personal Information: Name and email address (if provided).  
       - Usage Data: App interactions and basic device details.  
       - Question Data: Details of questions such as true/false, multiple-choice questions (MCQs), fill-in-the-blanks, 
         match-the-following, and other data specific to Prashna’s functionality.  

    2. How We Use Your Information  
       We use your information to:  
       - Enable features for creating, answering, and managing questions.  
       - Notify you about question results, updates, or important events.  
       - Improve app functionality and user experience.  
       - Provide customer support and address user queries.  

    3. Data Sharing and Disclosure  
       We do not sell or share your personal information, except in the following cases:  
       - With third-party service providers for app functionality, notifications, and analytics.  
       - To comply with legal obligations or protect our app from misuse.  

    4. Data Retention  
       We retain your data only as long as needed to provide app services. 
       You can request data deletion anytime by contacting us at neuralnetworklabsofficial@gmail.com.  

    5. Security  
       We prioritize data security and employ measures to protect your information. 
       However, no method of storage or transmission is entirely secure, and we cannot guarantee absolute security.  

    6. User Rights  
       You have the right to:  
       - Access, update, or delete your personal data.  
       - Opt out of notifications by adjusting app settings.  

    7. Third-Party Links  
       Prashna may contain links to third-party sites. We are not responsible for their privacy policies or practices.  

    8. Changes to This Policy  
       We may revise this Privacy Policy periodically. Changes will be effective from the 28th January 2025 mentioned above.  

    9. Contact Us  
       For questions or concerns about this Privacy Policy, reach us at:  
       Email: neuralnetworklabsofficial@gmail.com
  `;

  return (
   <div>
      <div className="flex justify-between items-center p-6 bg-white">
      <div className="flex items-center">
         <Link href="/">
            <img
               src="/images/logo.png"
               alt="Prashna AI Logo"
               className="mx-auto h-14 w-auto"
            />
         </Link>
         </div>
      </div>
      <div className="container mx-auto p-4 max-w-screen-md">
         <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
         <section className="text-base space-y-4">
         {privacyPolicyText.split("\n").map((line, index) => (
            <p key={index} className="leading-relaxed">
               {line.trim()}
            </p>
         ))}
         </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
