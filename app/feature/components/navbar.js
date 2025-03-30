"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Generate", path: "/generate" },
    { name: "Collection", path: "/collection" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="w-full  py-4  flex justify-center">
      <div className="flex gap-8 bg-white rounded-lg px-6 py-2 shadow-md">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} className="relative">
            <span
              className={`px-4 py-2 text-lg font-medium transition ${
                pathname === item.path ? "text-black font-semibold" : "text-black hover:text-gray-400"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
