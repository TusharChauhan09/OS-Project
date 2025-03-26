import React from "react";
import FIFOSimulator from "./FIFOSimulator";

const AlgorithmOverview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <span className="bg-blue-100 text-[#01216B] px-4 py-1 rounded-full text-sm font-semibold">
          PROJECT OVERVIEW
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-8">
          Page Replace<span className="border-b-4 border-[#01216B]">ment</span>{" "}
          Algorithms
        </h1>
      </div>

      {/* Understanding Section */}
      <div className="mb-12">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              className="w-6 h-6 text-[#01216B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#01216B] mb-2">
              Understanding Memory Management
            </h2>
            <p className="text-gray-600">
              Page Replacement Algorithms help manage virtual memory by deciding
              which pages to remove from RAM when new pages need to be loaded.
              This process is crucial for optimizing system performance.
            </p>
          </div>
        </div>
      </div>

      {/* Key Algorithms Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-[#01216B] mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Key Algorithms
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div>
                <span className="font-semibold">
                  FIFO (First-In-First-Out):
                </span>
                <p className="text-gray-600">
                  Replaces the oldest page in memory.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div>
                <span className="font-semibold">
                  LRU (Least Recently Used):
                </span>
                <p className="text-gray-600">
                  Replaces the page that hasn't been used for the longest time.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div>
                <span className="font-semibold">Optimal:</span>
                <p className="text-gray-600">
                  Replaces the page that won't be used for the longest time in
                  the future.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div>
                <span className="font-semibold">
                  LFU (Least Frequently Used):
                </span>
                <p className="text-gray-600">
                  Replaces the page with the lowest access frequency.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-[#01216B] p-6 rounded-xl text-white">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Interactive Demonstration
          </h3>
          <FIFOSimulator />
        </div>
      </div>
    </div>
  );
};

export default AlgorithmOverview;
