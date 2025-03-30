"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer = () => {
  return (
    <footer className="bg-[#1c1c57] text-white pt-8">
      <div className="container px-8 mx-auto flex justify-around flex-wrap">
        
        {/* Newsletter Section */}
        <div className="mb-8 max-w-xl">
          <h3 className="text-lg font-bold">Prashna AI</h3>
        </div>

        {/* Pages Section */}
        <div className="mb-8 ml-8">
          <h3 className="text-lg font-bold">Pages</h3>
          <ul className="mt-4">
            <li className="mt-2">
              <Link href="" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li className="mt-2">
              <Link href="" className="text-white hover:text-gray-300">About</Link>
            </li>
            <li className="mt-2">
              <Link href="" className="text-white hover:text-gray-300">Contact</Link>
            </li>
          </ul>
        </div> {/* ✅ Added missing closing tag here */}

        {/* Logo and Navigation Section */}
        <div className="container px-8 mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Prashna AI Logo"
              className="h-8 w-auto mr-4"
            />
            <div className="font-bold text-2xl">Prashna AI</div>
          </div>

          <div className="flex space-x-6">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => scrollToSection('about')}
            >
              About
            </span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => scrollToSection('pricing')}
            >
              Pricing
            </span>
          </div>

          <div className="flex items-center">
            <h3 className="mr-4 font-bold">Follow us</h3>
            <ul className="flex gap-4 items-center">
              <li><Facebook size={24} /></li>
              <li><Instagram size={24} /></li>
              <li><Twitter size={24} /></li>
              <li><Linkedin size={24} /></li>
              <li><Youtube size={24} /></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-300 py-4 mt-8 max-w-[90%] mx-auto flex justify-between">
          <p className="text-sm">© 2025 All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">
              <p className="text-sm">Privacy Policy</p>
            </Link>
            <Link href="/terms-of-service">
              <p className="text-sm">Terms of Service</p>
            </Link>
            <Link href="/refund-policy">
              <p className="text-sm">Refund Policy</p>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
