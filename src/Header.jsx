import React from "react";
import { useState } from "react";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="top-0 left-0 right-0 z-20 flex justify-between items-center h-16 w-screen bg-[#37393A] p-4 md:p-6 opacity-100">
      {/* City Logo visible on all screen sizes */}
      <div className="flex items-center">
        <a className="fixed block  h-11 w-11 rounded-full overflow-hidden">
          <img src="../src/assets/images/addis_abab_logo.jpg" alt="Addis Ababa Logo" />
        </a>
      </div>

      {/* Desktop Navigation visible on medium screens and up */}
      <div className="hidden md:flex flex-grow justify-center">
        <ul className="flex flex-wrap justify-center gap-4">
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Home</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Government</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">News</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Service</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Programs</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Economy</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Gallery</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Resource</li>
          <li className="text-white hover:text-gray-300 md:text-sm hover:underline">Contact</li>
          <li className="lg:absolute lg:right-30 text-white hover:text-gray-300 w-6 h-8 hidden md:block">
            {/* Search icon placeholder */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </li>
        </ul>
      </div>
      {/* Hamburger button visible on small screens only */}
      <button onClick={toggleMenu} className="md:hidden text-white p-2">
        {/* Hamburger icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" className={`${isMenuOpen ? "hidden " : ""}h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="relative md:hidden inset-0 bg-opacity-95 z-30 items-center justify-center space-y-8">
          <ul className="absolute rounded-b-4xl w-40 bg-[#37393A] right-0 top-12  flex flex-col h-100 items-center space-y-6 text-2xl">
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Home</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Government</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">News</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Service</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Programs</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Economy</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Gallery</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Resource</a></li>
            <li className="text-sm text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Contact</a></li>
          </ul>
          <button onClick={toggleMenu} className="right-2 text-white p-2">
            {/* Close icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
