import React from "react";

const Button = ({ children, variant, size, className, ...props }) => {
  return (
    <button
      {...props}
      className={`rounded px-4 py-2 ${
        variant === "ghost" ? "bg-transparent" : "bg-gray-200"
      } ${size === "sm" ? "text-sm" : "text-base"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 
