import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[500px] flex flex-col items-center justify-center text-center px-4">
      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-[#01216B] bg-opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98h-98z' fill='none' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          About Algo-Chunk
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Visualizing and implementing page replacement algorithms to understand
          memory management in operating systems.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/algorithm"
            className="px-8 py-3 bg-white text-[#01216B] rounded-md font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-icons">menu_book</span>
            Explore Algorithms
          </Link>

          <Link
            to="/algorithm"
            className="px-8 py-3 bg-[#1e3a8a] text-white rounded-md font-medium hover:bg-[#2b4a9a] transition-colors duration-200 border border-blue-400 flex items-center justify-center gap-2"
          >
            <span className="material-icons">code</span>
            View Interactive Demo
          </Link>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
