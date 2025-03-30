import React from "react";
import Link from "next/link";


const TermsAndConditions = () => {
  const termsText = ` 
    Welcome to Prashna ("we," "our," or "us"). By using our app, you agree to comply with and be bound by the following terms and conditions.

    1. Acceptance of Terms  
       By accessing or using the Prashna app, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our app.

    2. Use of the App  
       You agree to use the app only for lawful purposes and in accordance with these Terms and Conditions. You are prohibited from:  
       - Using the app for any illegal or unauthorized purposes.  
       - Attempting to interfere with the proper functioning of the app.  
       - Violating the rights of other users.

    3. Account Responsibility  
       You are responsible for maintaining the confidentiality of your account information. You agree to notify us immediately if you suspect any unauthorized access to your account.

    4. Intellectual Property  
       All content provided in the app, including text, graphics, logos, and software, is the property of Prashna and is protected by intellectual property laws. You may not use, modify, or distribute our content without permission.

    5. Third-Party Links  
       Our app may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites and encourage you to read their terms and conditions.

    6. Limitation of Liability  
       Prashna is not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the app. We do not guarantee that the app will always be available or free of errors.

    7. Termination  
       We reserve the right to suspend or terminate your access to the app at our sole discretion, without prior notice, for violations of these terms.

    8. Changes to Terms  
       We may update these Terms and Conditions from time to time. Any changes will be effective immediately upon posting. Please review this page regularly for any updates.

    9. Governing Law  
       These Terms and Conditions are governed by the laws of the jurisdiction where Prashna operates.

    10. Contact Us  
       If you have any questions or concerns about these Terms and Conditions, please contact us at:  
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
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <section className="text-base space-y-4">
        {termsText.split("\n").map((line, index) => (
          <p key={index} className="leading-relaxed">
            {line.trim()}
          </p>
        ))}
      </section>
    </div>
    </div>
  );
};

export default TermsAndConditions;
