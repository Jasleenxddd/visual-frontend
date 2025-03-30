'use client'
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false); // Close mobile menu after clicking
        }
    };

    return (
        <nav className="flex justify-between items-center p-6 bg-white">
            <div className="flex items-center">
                <img
                    src="/images/logo.png"
                    alt="Prashna AI Logo"
                    className="mx-auto h-14 w-auto"
                />
                <div className="font-bold text-4xl">Prashna AI</div>
            </div>
            <div className="hidden md:flex">
                <ul className="flex gap-6 items-center">
                    <li 
                        className="cursor-pointer hover:underline"
                        onClick={() => scrollToSection('about')}
                    >
                        About
                    </li>
                    <li 
                        className="cursor-pointer hover:underline"
                        onClick={() => scrollToSection('pricing')}
                    >
                        Pricing
                    </li>
                    <li 
                        className="cursor-pointer hover:underline"
                        onClick={() => scrollToSection('contact')}
                    >
                        Contact
                    </li>
                    <li>
                        <Link href="/login">
                            <button className="px-4 py-2 rounded-md hover:bg-blue-600 bg-blue-500 transition text-white">
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-2xl">
                    ☰
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-blue-500 text-white flex flex-col items-start p-4 md:hidden">
                    <ul className="flex flex-col gap-4 w-full">
                        <li 
                            className="cursor-pointer hover:underline"
                            onClick={() => scrollToSection('about')}
                        >
                            About
                        </li>
                        <li 
                            className="cursor-pointer hover:underline"
                            onClick={() => scrollToSection('pricing')}
                        >
                            Pricing
                        </li>
                        <li 
                            className="cursor-pointer hover:underline"
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact
                        </li>
                        <li>
                            <Link href="/login">
                                <button className="px-4 py-2 rounded-md hover:bg-gray-300 bg-gray-200 text-black w-full">
                                    Login
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;