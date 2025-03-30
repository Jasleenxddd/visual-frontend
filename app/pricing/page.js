'use client';
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const getUserDetails = async () => {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!userId || !token) {
    console.error("User ID or authToken not found in localStorage");
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/get-details?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    const { username, email, subscription } = data.user;

    return { username, email, subscription };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

const Pricing = () => {
  const [currentSubscription, setCurrentSubscription] = useState("free");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const subscription = localStorage.getItem("subscribed");
    if (subscription) {
      setCurrentSubscription(subscription.toLowerCase());
    }

    const fetchUserDetails = async () => {
      const details = await getUserDetails();
      setUserDetails(details);
    };
    fetchUserDetails();
  }, []);

  const handlePaymentRedirect = (planType) => {
    if (!userDetails) {
      console.error("User details not available");
      return;
    }

    const [firstName = "", lastName = ""] = userDetails.username.split(" ");
    
    const baseUrls = {
      individual: "https://checkout.dodopayments.com/buy/pdt_6LJXpcANRtUhY3IMmQQn7?quantity=1&redirect_url=https://www.prashna.co%2Fdashboard",
      team: "https://checkout.dodopayments.com/buy/pdt_rQnOurQWylFku7ELtkmYw?quantity=1&redirect_url=https://www.prashna.co%2Fdashboard"
    };

    const url = new URL(baseUrls[planType]);
    const params = new URLSearchParams({
      quantity: "1",
      firstName: firstName,
      lastName: lastName,
      email: userDetails.email,
      readonly: "true" 
    });
    
    url.search = params.toString();
    window.location.href = url.toString();
  };

  const getButtonProps = (planType) => {
    if (currentSubscription === "team") {
      return {
        text: planType === "team" ? "Current Plan" : "Contact Support to Downgrade",
        disabled: true,
        bgColor: "bg-gray-300",
        hoverColor: "",
        onClick: () => {}
      };
    }

    if (currentSubscription === "individual") {
      if (planType === "individual") {
        return {
          text: "Current Plan",
          disabled: true,
          bgColor: "bg-gray-300",
          hoverColor: "",
          onClick: () => {}
        };
      }
      return {
        text: "Subscribe",
        disabled: false,
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        onClick: () => handlePaymentRedirect("team")
      };
    }

    return {
      text: "Subscribe",
      disabled: false,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      onClick: () => handlePaymentRedirect(planType)
    };
  };

  const individualButtonProps = getButtonProps("individual");
  const teamButtonProps = getButtonProps("team");

  return (
    <div className="min-h-screen py-10 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5 ml-4">
          <Link href="/dashboard" className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition">
            Back to Dashboard
          </Link>
        </div>
        <div className="px-8">
          <h1 className="text-5xl font-bold text-center mb-16">Pricing</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-white rounded-lg border-2 p-8 flex flex-col justify-between ${individualButtonProps.disabled ? 'border-gray-300' : 'border-blue-500'} ${individualButtonProps.disabled ? 'opacity-75' : ''}`}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Individual Plan</h2>
                <h1><span className="text-4xl font-bold mb-4">$11.99</span>/month or <span className="text-4xl font-bold mb-4">$99</span>/year</h1>
                <p className="mb-6 text-gray-700 text-sm mt-4">Best plan for individuals.</p>
                <ul className="text-gray-700 text-base leading-7 mb-6">
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />75 credits/month</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />1 user account</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />No Watermark on Exports</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />Priority email support</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />15-day money-back guarantee</li>
                </ul>
                <p className="text-xs text-gray-700">Are you a student? Request student discount by dropping an email to <span className="font-bold mb-1">hello@prashna.co </span>before subscribing.</p>
              </div>
              <button 
                className={`w-full py-3 mt-4 ${individualButtonProps.bgColor} text-white font-semibold rounded ${individualButtonProps.hoverColor} transition`}
                onClick={individualButtonProps.onClick}
                disabled={individualButtonProps.disabled}
              >
                {individualButtonProps.text}
              </button>
            </div>

            <div className={`bg-white rounded-lg border-2 p-8 flex flex-col justify-between ${teamButtonProps.disabled ? 'border-gray-300' : 'border-blue-500'} ${teamButtonProps.disabled ? 'opacity-75' : ''}`}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Team Plan</h2>
                <h1><span className="text-4xl font-bold mb-4">$19.99</span>/month or <span className="text-4xl font-bold mb-4">$199</span>/year</h1>
                <p className="mb-6 text-gray-700 text-sm mt-4">Suitable for a team of up to 5 people.</p>
                <ul className="text-gray-700 text-base leading-7 mb-6">
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />100 credits/month/user account</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />Maximum 5 user accounts</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />No Watermark on Exports</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />Priority email support and on-call support</li>
                  <li className="flex"><Check className="text-blue-500 w-6 h-6 mr-2" />15-day money-back guarantee</li>
                </ul>
                <p className="text-xs text-gray-700">Are you a student? Request student discount by dropping an email to <span className="font-bold mb-1">hello@prashna.co </span>before subscribing.</p>
              </div>
              <button 
                className={`w-full py-3 mt-4 ${teamButtonProps.bgColor} text-white font-semibold rounded ${teamButtonProps.hoverColor} transition`}
                onClick={teamButtonProps.onClick}
                disabled={teamButtonProps.disabled}
              >
                {teamButtonProps.text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;