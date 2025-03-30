import React from "react";
import Link from "next/link";

const RefundPolicy = () => {
  const refundPolicyText = `
    Prashna ("we," "our," or "us") values your satisfaction and strives to provide the best user experience. This Refund Policy explains the conditions under which refunds may be issued for services or products purchased through our app.

    1. Eligibility for Refunds  
       Refunds may be issued in the following cases:  
       - If there is a technical error that prevents access to a purchased service.  
       - If a duplicate transaction occurs due to a system issue.  
       - If the service or product does not match the description provided in the app.  

    2. Non-Refundable Cases  
       Refunds will not be issued in the following situations:  
       - Change of mind after purchasing a service or product.  
       - Failure to use the service or product within the specified time period.  
       - Issues caused by user negligence or misuse of the app.  

    3. Refund Request Process  
       To request a refund, please follow these steps:  
       - Contact us at neuralnetworklabsofficial@gmail.com with your transaction details.  
       - Provide a clear explanation of the issue and any supporting evidence (e.g., screenshots or receipts).  
       - Refund requests must be submitted within 15 days of the transaction date.  

    4. Processing Time  
       Upon receiving your refund request, we will:  
       - Review the request and validate the claim.  
       - Notify you of the status of your refund within 5-7 business days.  
       - Issue a refund, if approved, via the original payment method.  

    5. Partial Refunds  
       In some cases, we may offer a partial refund if only a portion of the service or product was unsatisfactory.

    6. Cancellation Policy  
       - If a subscription-based service is canceled before its renewal, you may continue to use the service until the current billing period ends.  
       - No refunds will be provided for partial periods of subscription usage.  

    7. Contact Us  
       For refund-related queries, please contact us at:  
       Email: neuralnetworklabsofficial@gmail.com

    We reserve the right to modify this Refund Policy at any time. Any changes will be effective immediately upon posting. Please review this policy periodically for updates.
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
      <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
      <section className="text-base space-y-4">
        {refundPolicyText.split("\n").map((line, index) => (
          <p key={index} className="leading-relaxed">
            {line.trim()}
          </p>
        ))}
      </section>
    </div>
    </div>
  );
};

export default RefundPolicy;
