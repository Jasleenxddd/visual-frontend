import React from "react";
import { Menu, Sidebar } from "lucide-react";
import { Button } from "../ui/button"; // Correct import for default export
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        {/* Use Button directly to avoid nested buttons */}
        
      </SheetTrigger>

      <SheetContent side="left" className="p-0 md:hidden">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
