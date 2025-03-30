// File: components/ui/sheet.js

import * as React from "react";

export const Sheet = ({ children }) => {
  return <div className="sheet">{children}</div>;
};

export const SheetContent = ({ children, side, className }) => {
  return (
    <div className={`sheet-content ${side} ${className}`}>
      {children}
    </div>
  );
};

// Modified SheetTrigger to avoid wrapping a button inside a button
export const SheetTrigger = ({ children, as: Component = 'button' }) => {
  return <Component className="sheet-trigger">{children}</Component>;
};
