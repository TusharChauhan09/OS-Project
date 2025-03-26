import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
        setIsOpen(false);
      } else {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex justify-between items-center h-13 border-b shadow-xl inset-1 px-4 md:px-10">
      {/* Logo */}
      <div className="h-full py-2">
        <Link to="/algorithm">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10061/10061724.png"
            className="h-full"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`
          ${isMobile ? (isOpen ? "flex" : "hidden") : "flex"}
          ${
            isMobile
              ? "absolute top-13 left-0 right-0 bg-white shadow-lg"
              : "relative bg-transparent shadow-none"
          }
          flex-col 
          md:flex-row 
          p-2 
          justify-center 
          items-center 
          gap-6 
          md:gap-20
          transition-all
          duration-300
          ease-in-out
          z-50
        `}
      >
        <li className="w-full md:w-auto text-center py-2 md:py-0">
          <Link
            to="/algorithm"
            className="flex items-center justify-center space-x-1 hover:cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10061/10061724.png"
              className="h-8"
              alt="Algorithm Icon"
            />
            <p className="my-auto">Algorithm</p>
          </Link>
        </li>

        <li className="w-full md:w-auto text-center py-2 md:py-0">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-600 transition-colors"
          >
            About
          </Link>
        </li>

        <li className="w-full md:w-auto text-center py-2 md:py-0">
          <Link
            to="/difference"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-600 transition-colors"
          >
            Differences
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
