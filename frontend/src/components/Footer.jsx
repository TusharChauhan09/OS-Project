import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-[#01216B] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Algo-Chunk</h2>
            <p className="text-gray-300 text-sm max-w-md">
              A visual simulator demonstrating page replacement algorithms for
              virtual memory management.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <HiMail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/algo-chunk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p className="text-gray-300">Have questions or suggestions?</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#01216B] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Algo-Chunk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
