"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md text-gray-900 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 group">
          <Image
            src="/favicon.svg" // 🔁 Replace this with your actual image path (e.g., public/logo.png)
            alt="AI Mock Logo"
            width={32}
            height={32}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:opacity-90 transition duration-300">
            AI<span className="font-bold">Mock</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-[16px] font-medium">
          <a
            href="#features"
            className="hover:text-indigo-600 hover:underline underline-offset-4 transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-indigo-600 hover:underline underline-offset-4 transition"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="hover:text-indigo-600 hover:underline underline-offset-4 transition"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-indigo-600 hover:underline underline-offset-4 transition"
          >
            Contact
          </a>
        </nav>

        {/* Auth Buttons - Desktop */}

        <div className="hidden md:block">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="
          px-4 py-2 
          bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white 
          rounded-md 
          hover:bg-gradient-to-r hover:from-indigo-700 hover:via-purple-600 hover:to-pink-600 
          transition-colors
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-500 
          focus:ring-offset-2
          flex items-center space-x-2
        "
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-20 h-20 rounded-full border-4 border-transparent bg-clip-border bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-xl hover:scale-105 transform transition duration-300 ease-in-out",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>

        {/* Hamburger - Mobile */}
        <button
          onClick={toggleNav}
          className="md:hidden text-2xl text-indigo-700 focus:outline-none hover:text-indigo-900 transition"
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {navOpen && (
        <div className="md:hidden px-6 pb-6 pt-4 bg-white text-gray-900 space-y-4 shadow-md transition-all duration-300 rounded-b-xl">
          <a
            href="#features"
            className="block hover:text-indigo-600 transition"
          >
            Features
          </a>
          <a href="#pricing" className="block hover:text-indigo-600 transition">
            Pricing
          </a>
          <a href="#about" className="block hover:text-indigo-600 transition">
            About
          </a>
          <a href="#contact" className="block hover:text-indigo-600 transition">
            Contact
          </a>

          {/* Auth Buttons - Mobile */}
          <div className="pt-6 border-t">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="
          w-full px-4 py-2 
          bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white 
          rounded-md 
          hover:bg-gradient-to-r hover:from-indigo-700 hover:via-purple-600 hover:to-pink-600 
          transition-colors
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-500 
          focus:ring-offset-2
          flex items-center justify-center space-x-2
        "
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-16 h-16 mx-auto rounded-full border-4 border-transparent bg-clip-border bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-xl hover:scale-105 transform transition duration-300 ease-in-out",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
